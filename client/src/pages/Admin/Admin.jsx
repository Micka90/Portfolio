import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AddProjectModal from '../../components/Modal/AddProjectModal';
import ProjectModal from '../../components/Modal/ProjectModal';
import './Admin.css';

function Admin() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/user/logout`, {
      credentials: 'include',
    });
    setAuth(null);
    navigate('/login');

    const initialLocalCart = localStorage.getItem('cart');
    if (initialLocalCart && JSON.parse(initialLocalCart).length !== 0) {
      localStorage.removeItem('cart');
    }
  };
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
      <button className="return-button" type="button" onClick={logout}>
        Déconnexion
      </button>
    </section>
  );
}

export default Admin;
