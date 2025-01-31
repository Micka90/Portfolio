import './Nav.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa6';
import { TbFileCv } from 'react-icons/tb';
import CVModal from '../Modal/CVModal';

function Nav() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <nav>
      <ul className="navlist">
        <li className="navproject">
          <Link className="navproject" to="/Project">
            Projet
          </Link>
        </li>
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
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
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
