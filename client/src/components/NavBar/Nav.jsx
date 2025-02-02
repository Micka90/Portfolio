import './Nav.css';
import { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa6';
import { FaHome } from 'react-icons/fa';
import { TbFileCv } from 'react-icons/tb';
import { useLocation } from 'react-router-dom';
import CVModal from '../Modal/CVModal';
import Logo from '../../assets/Logo MB.png';

function Nav() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul className="navlist">
        <div className="logo-container">
          <img src={Logo} className="logonav" alt="logo" />
          {location.pathname !== '/' && (
            <a href="/" aria-label="Accueil" className="home-button">
              <FaHome className="iconenav" title="Accueil" />
            </a>
          )}
        </div>
        <li className="navicone">
          <a
            href="https://github.com/Micka90"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="iconenav" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="iconenav" />
          </a>

          <button
            onClick={() => setModalIsOpen(true)}
            className="cv-button"
            aria-label="Voir le CV"
          >
            <TbFileCv className="iconenav" title="Voir le CV" />
          </button>
          <a
            href="mailto:mickael.beaugrand@outlook.fr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <FaEnvelope className="iconenav" />
          </a>
        </li>
      </ul>

      <CVModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} />
    </nav>
  );
}

export default Nav;
