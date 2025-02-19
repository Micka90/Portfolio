import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../contexts/AuthContext';
import './Modal.css';
import './AddProjectModal.css';

Modal.setAppElement('#root');

function AddProjectModal({ isOpen, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [projectLink, setProjectLink] = useState('');
  const [repoGitHub, setRepoGitHub] = useState('');
  const [stacks, setStacks] = useState([]);
  const [selectedStacks, setSelectedStacks] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    if (isOpen) {
      fetchStacks();
    }
  }, [isOpen]);

  const fetchStacks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/stack`);
      if (response.ok) {
        const data = await response.json();
        setStacks(data);
      } else {
        console.error(' Erreur lors de la récupération des stacks');
      }
    } catch (error) {
      console.error(' Erreur réseau:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth?.token) {
      console.warn(" Token manquant, impossible d'ajouter un projet !");
      alert('Votre session a expiré, veuillez vous reconnecter.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('project_image', file);
    formData.append('project_link', projectLink || 'Non spécifié');
    formData.append('repo_github', repoGitHub || 'Non spécifié');

    selectedStacks.forEach((stackId) => {
      formData.append('stackIds[]', stackId);
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/project`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert('✅ Projet ajouté avec succès !');
        onClose();
      } else {
        alert("❌ Échec de l'ajout du projet.");
      }
    } catch (error) {
      console.error('❌ Erreur:', error);
      alert('❌ Une erreur est survenue.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Ajouter un Projet"
      className="add-project-modal"
    >
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>

      <h2>Ajouter un Projet</h2>
      <form className="add-project" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom du Projet"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description du Projet"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
          required
        ></textarea>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <input
          type="url"
          placeholder="Lien du Projet (optionnel)"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
        />
        <input
          type="url"
          placeholder="Répertoire GitHub (optionnel)"
          value={repoGitHub}
          onChange={(e) => setRepoGitHub(e.target.value)}
        />

        <fieldset>
          <legend>Sélectionner les Stacks :</legend>
          <div className="checkbox-container">
            {stacks.map((stack) => (
              <div key={stack.idStack} className="checkbox-stack">
                <input
                  type="checkbox"
                  id={`stack-${stack.idStack}`}
                  value={stack.idStack}
                  checked={selectedStacks.includes(stack.idStack)}
                  onChange={() =>
                    setSelectedStacks((prev) =>
                      prev.includes(stack.idStack)
                        ? prev.filter((id) => id !== stack.idStack)
                        : [...prev, stack.idStack]
                    )
                  }
                />
                <label htmlFor={`stack-${stack.idStack}`}>{stack.name}</label>
              </div>
            ))}
          </div>
        </fieldset>

        <div className="buttons-container">
          <button type="submit" className="add-btn">
            Ajouter
          </button>
          <button type="button" onClick={onClose} className="cancel-btn">
            Annuler
          </button>
        </div>
      </form>
    </Modal>
  );
}

AddProjectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddProjectModal;
