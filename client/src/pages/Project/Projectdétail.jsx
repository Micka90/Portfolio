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
        <div>
            <h1>{project.name}</h1>
            <img src={project.image} alt={project.name} className='ImageDetail'/>
            <p>{project.description}</p>
            <p>{project.repoGitHub}</p>
            <p>{project.projectLink}</p>
        </div>
    );
};

export default ProjectDetail;

