import { useState, useEffect } from 'react';
import './Admin.css';

function Admin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [projectLink, setProjectLink] = useState('');
  const [repoGitHub, setRepoGitHub] = useState('');
  const [stacks, setStacks] = useState([]); // Liste des stacks disponibles
  const [selectedStacks, setSelectedStacks] = useState([]); // IDs des stacks sélectionnées

  // Charger les stacks disponibles depuis l'API
  useEffect(() => {
    const fetchStacks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/stack`);
        if (response.ok) {
          const data = await response.json();
          setStacks(data);
        } else {
          console.error('Failed to fetch stacks');
        }
      } catch (error) {
        console.error('Error fetching stacks:', error);
      }
    };

    fetchStacks();
  }, []);

  // Gérer la sélection/désélection d'une stack
  const handleStackChange = (idStack) => {
    setSelectedStacks((prevSelected) =>
      prevSelected.includes(idStack)
        ? prevSelected.filter((id) => id !== idStack) // Retirer si déjà sélectionné
        : [...prevSelected, idStack] // Ajouter si non sélectionné
    );
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('project_image', file);
    formData.append('project_link', projectLink || 'Non spécifié');
    formData.append('repo_github', repoGitHub || 'Non spécifié');

    // Ajouter les IDs des stacks sélectionnées
    selectedStacks.forEach((stackId) => {
      formData.append('stackIds[]', stackId);
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/project`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Project added successfully!');
        setTitle('');
        setDescription('');
        setFile(null);
        setProjectLink('');
        setRepoGitHub('');
        setSelectedStacks([]); // Réinitialiser la sélection
      } else {
        alert('Failed to add project.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  return (
    <section className="projects-form">
      <h1>Add Project</h1>
      <form className="add-project" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Project Description"
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
          placeholder="Project Link (optional)"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
        />
        <input
          type="url"
          placeholder="GitHub Repository (optional)"
          value={repoGitHub}
          onChange={(e) => setRepoGitHub(e.target.value)}
        />

        {/* Checkboxes pour les stacks */}
        <fieldset>
          <legend>Select Stacks:</legend>
          {stacks.map((stack) => (
            <div key={stack.idStack} className="checkbox-stack">
              <input
                type="checkbox"
                id={`stack-${stack.idStack}`}
                value={stack.idStack}
                checked={selectedStacks.includes(stack.idStack)}
                onChange={() => handleStackChange(stack.idStack)}
              />
              <label htmlFor={`stack-${stack.idStack}`}>{stack.name}</label>
            </div>
          ))}
        </fieldset>

        <button type="submit">Add Project</button>
      </form>
    </section>
  );
}

export default Admin;


