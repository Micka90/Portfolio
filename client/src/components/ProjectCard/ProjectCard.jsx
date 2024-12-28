import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCards = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3310/api/project')
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => console.error('Erreur API :', error));
  }, []);

  const handlecardClick = (id) => {
    navigate(`/Project/${id}`);
  };

  return (
    <div className="card-container">
      {projects.length > 0 ? (
        projects.map((project) => (
          <div
            key={project.idProject}
            className="card"
            onClick={() => handlecardClick(project.idProject)}
          >
            <img src={project.image} alt={project.name} />
            <h3>{project.name}</h3>
          </div>
        ))
      ) : (
        <p>Aucun projet disponible.</p>
      )}
    </div>
  );
};

export default ProjectCards;
