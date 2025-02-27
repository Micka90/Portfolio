import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ProjectDétail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3310/api/project/${id}`)
      .then((response) => response.json())
      .then((data) => setProject(data))
      .catch((error) => console.error('Erreur API :', error));
  }, [id]);

  if (!project) {
    return <p>Chargement des détails du projet...</p>;
  }

  return (
    <div className="project-detail-container">
      <h1>{project.name}</h1>
      <img src={project.image} alt={project.name} className="Image-Detail" />
      <p className="description">{project.description}</p>

      <section className="links-stacks-container">
        <p className="links">
          <strong>Repo GitHub :</strong>
          <a
            href={project.repoGitHub}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.repoGitHub}
          </a>
          <strong>Projet en ligne :</strong>
          <a
            href={project.projectLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.projectLink}
          </a>
        </p>

        {project.stacks && project.stacks.length > 0 && (
          <div className="stacks-container">
            <h3>Stacks utilisées :</h3>
            <div className="stacks-list">
              {project.stacks.map((stack) => (
                <div key={stack.idStack}>
                  <img
                    src={stack.icon}
                    alt={stack.name}
                    className="stack-icon"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProjectDetail;
