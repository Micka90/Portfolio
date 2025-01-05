import { useState } from 'react';
import './Admin.css';

function Admin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [projectLink, setProjectLink] = useState('');
  const [repoGitHub, setRepoGitHub] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('project_image', file);
    formData.append('project_link', projectLink || 'Non spécifié');
    formData.append('repo_github', repoGitHub || 'Non spécifié');


    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/project`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        alert('Project added successfully!');
        setTitle('');
        setDescription('');
        setFile(null);
        setProjectLink('');
        setRepoGitHub('');
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
          className="project-title"
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="project-description"
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
          required
        ></textarea>
        <input
          className="project-file"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <input
          className="project-link"
          type="url"
          placeholder="Project Link (e.g., https://example.com)"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
        />
        <input
          className="repo-github"
          type="url"
          placeholder="GitHub Repository Link"
          value={repoGitHub}
          onChange={(e) => setRepoGitHub(e.target.value)}
        />
        <button type="submit">Add Project</button>
      </form>
    </section>
  );
}

export default Admin;


