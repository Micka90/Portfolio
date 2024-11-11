import "./Nav.css";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";
import { TbFileCv } from "react-icons/tb";
import pdf from "../../assets/CV-2024-DEV.pdf";

function Nav() {
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
          <a
            href={pdf}
            download
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download CV"
          >
            <TbFileCv className="iconenav" title="Télécharger le CV" />
          </a>
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
    </nav>
  );
}

export default Nav;
