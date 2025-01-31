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

  const handleDetailsClick = (id) => {
    navigate(`/Project/${id}`);
  };

  const handleSiteClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className="card-container">
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.idProject} className="card">
            <div className="card-image-container">
              <img src={project.image} alt={project.name} />
            </div>
            <h3>{project.name}</h3>

            <div className="card-content">
              <button onClick={() => handleDetailsClick(project.idProject)}>
                Détails
              </button>
              <button onClick={() => handleSiteClick(project.projectLink)}>
                Visite moi
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Aucun projet disponible.</p>
      )}
    </div>
  );
};

export default ProjectCards;
