import { useState } from 'react';
import './Admin.css';

function Admin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('project_image', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/project`,
         {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Project added successfully!');
        setTitle('');
        setDescription('');
        setFile(null);
      } else {
        alert('Failed to add project.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  return (
    <section>
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
        <button type="submit">Add Project</button>
      </form>
    </section>
  );
}

export default Admin;
