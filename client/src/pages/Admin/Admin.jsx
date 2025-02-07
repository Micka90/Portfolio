import { useState } from 'react';
import AddProjectModal from '../../components/Modal/AddProjectModal';
import ProjectModal from '../../components/Modal/ProjectModal';

function Admin() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <section className="projects-form">
      <h1>Gestion des Projets</h1>
      <button onClick={() => setIsProjectModalOpen(true)}>
        Voir les projets
      </button>
      <button onClick={() => setIsAddModalOpen(true)}>Ajouter un projet</button>

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </section>
  );
}

export default Admin;
