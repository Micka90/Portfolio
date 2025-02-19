import './HomePage.css';
import ProjectCard from '../../components/ProjectCard/ProjectCard';

function HomePage() {
  return (
    <div className="homepage">
      <section className=" containerhome">
        <h1>Mickaël Beaugrand</h1>
        <h2>Développeur Junior</h2>
        <p className="homedescription ">
          Passionné par la tech et son écosystème, j’ai fait le choix d’une
          reconversion professionnelle pour devenir développeur web. J’aime
          explorer autant le frontend que le backend, et je suis en
          apprentissage constant pour affiner mes compétences et relever de
          nouveaux défis. Fort d’une expérience en tant qu’ancien chef d’équipe,
          j’accorde une grande importance à la communication, au partage de
          connaissances et à la collaboration. Travailler ensemble, apprendre
          des autres et faire évoluer un projet en équipe sont des aspects qui
          me tiennent à cœur. Aujourd’hui, je suis à la recherche d’une
          alternance ou d’un poste de développeur web junior, prêt à apprendre,
          contribuer et évoluer dans un environnement stimulant.
        </p>
        <ProjectCard />
      </section>
    </div>
  );
}

export default HomePage;
