import { useEffect, useState } from 'react';
import './ProjectCard.css';

const ProjectCards = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3310/api/project')
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => console.error('Erreur API :', error));
  }, []);
  return (
    <div className="card-container">
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.idProject} className="card">
            <img
              src={project.image}
              alt={project.name}
            />
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        ))
      ) : (
        <p>Aucun projet disponible.</p>
      )}
    </div>
  );
};

export default ProjectCards;
