import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../contexts/AuthContext';

Modal.setAppElement('#root');

function ProjectModal({ isOpen, onClose }) {
  const [projects, setProjects] = useState([]);
  const [stacks, setStacks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedStacks, setSelectedStacks] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    if (isOpen) {
      fetchProjects();
      fetchStacks();
    }
  }, [isOpen]);

  const fetchProjects = async () => {
    if (!auth?.token) {
      console.warn('❌ Token manquant, impossible de récupérer les projets !');
      alert('Votre session a expiré, veuillez vous reconnecter.');
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/project`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          credentials: 'include',
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error(' Erreur lors de la récupération des projets');
      }
    } catch (error) {
      console.error(' Erreur réseau:', error);
    }
  };

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

  const handleDelete = async (id) => {
    if (!auth?.token) {
      console.warn(' Token manquant, suppression impossible !');
      alert('Votre session a expiré, veuillez vous reconnecter.');
      return;
    }

    const confirmDelete = window.confirm(
      'Êtes-vous sûr de vouloir supprimer ce projet ?'
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/project/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      console.log('🔍 Requête suppression projet envoyée :', response);

      if (response.ok) {
        alert('✅ Projet supprimé avec succès');
        fetchProjects();
      } else {
        alert('❌ Échec de la suppression du projet');
      }
    } catch (error) {
      console.error('❌ Erreur de suppression:', error);
    }
  };

  const openUpdateModal = async (project) => {
    if (!auth?.token) {
      console.warn('❌ Token manquant, mise à jour impossible !');
      return;
    }

    setSelectedProject(project);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/project/${project.idProject}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSelectedStacks(
          data.stacks ? data.stacks.map((stack) => stack.idStack) : []
        );
      } else {
        console.error('❌ Erreur lors de la récupération des stacks du projet');
      }
    } catch (error) {
      console.error('❌ Erreur réseau:', error);
    }

    setIsUpdateModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedProject || !auth?.token) {
      console.warn(
        '❌ Token manquant ou projet non sélectionné, mise à jour impossible !'
      );
      return;
    }

    const updatedData = {
      name: selectedProject.name,
      description: selectedProject.description,
      repoGitHub: selectedProject.repoGitHub,
      projectLink: selectedProject.projectLink,
      stackIds: selectedStacks.length > 0 ? selectedStacks : undefined,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/project/${
          selectedProject.idProject
        }`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      console.log('🔍 Requête mise à jour projet envoyée :', response);

      if (response.ok) {
        alert('✅ Projet mis à jour avec succès');
        fetchProjects();
        setIsUpdateModalOpen(false);
      } else {
        alert('❌ Échec de la mise à jour');
      }
    } catch (error) {
      console.error('❌ Erreur de mise à jour:', error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Liste des Projets"
      >
        <h2>Liste des projets</h2>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <ul>
          {projects.map((project) => (
            <li key={project.idProject}>
              {project.name}
              <button onClick={() => openUpdateModal(project)}>
                Mettre à jour
              </button>
              <button onClick={() => handleDelete(project.idProject)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </Modal>

      <Modal
        isOpen={isUpdateModalOpen}
        onRequestClose={() => setIsUpdateModalOpen(false)}
        contentLabel="Mettre à jour le Projet"
      >
        <h2>Mettre à jour {selectedProject?.name}</h2>
        <input
          type="text"
          value={selectedProject?.name || ''}
          onChange={(e) =>
            setSelectedProject({ ...selectedProject, name: e.target.value })
          }
        />
        <textarea
          value={selectedProject?.description || ''}
          onChange={(e) =>
            setSelectedProject({
              ...selectedProject,
              description: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Repo GitHub"
          value={selectedProject?.repoGitHub || ''}
          onChange={(e) =>
            setSelectedProject({
              ...selectedProject,
              repoGitHub: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Lien Projet"
          value={selectedProject?.projectLink || ''}
          onChange={(e) =>
            setSelectedProject({
              ...selectedProject,
              projectLink: e.target.value,
            })
          }
        />

        <fieldset>
          <legend>Stacks associées</legend>
          {stacks.map((stack) => (
            <div key={stack.idStack}>
              <input
                type="checkbox"
                value={stack.idStack}
                checked={selectedStacks.includes(stack.idStack)}
                onChange={() =>
                  setSelectedStacks((prevSelected) =>
                    prevSelected.includes(stack.idStack)
                      ? prevSelected.filter((id) => id !== stack.idStack)
                      : [...prevSelected, stack.idStack]
                  )
                }
              />
              <label>{stack.name}</label>
            </div>
          ))}
        </fieldset>

        <button onClick={handleUpdate}>Enregistrer</button>
        <button onClick={() => setIsUpdateModalOpen(false)}>Annuler</button>
      </Modal>
    </>
  );
}

ProjectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProjectModal;
