const AbstractSeeder = require('./AbstractSeeder');

class ProjectSeeder extends AbstractSeeder {
  dependencies() {
    return [];
  }

  async run() {
    const baseUrl = process.env.APP_HOST || 'http://localhost:3000';
    const projects = [
      {
        name: 'GEMS',
        description:
          'Gems est une plateforme de revente de bijoux en ligne. Elle permet aux utilisateurs de vendre et d’acheter des bijoux d’occasion.',
        project_image: `${baseUrl}/uploads/GEMS.png`,
        userId: 1,
        repoGitHub: 'https://github.com/Micka90/P3-Gems',
        projectLink: 'https://gems-gems.fr/',
      },
      {
        name: 'Film Fusion',
        description:
          'Film Fusion est une plateforme dédiée au cinéma, permettant aux utilisateurs de découvrir, partager et discuter de films. Elle offre une interface intuitive pour explorer les dernières sorties, accéder à des informations détaillées sur les films, et interagir avec une communauté de cinéphiles.',
        project_image: `${baseUrl}/uploads/Film-fusion.png`,
        userId: 1,
        repoGitHub: 'https://github.com/Micka90/-P2-FilmFusion',
        projectLink: 'https://p2-film-fusion-client.vercel.app/',
      },
      // {
      //   name: 'GEMS',
      //   description:
      //     'Gems est une plateforme de revente de bijoux en ligne. Elle permet aux utilisateurs de vendre et d’acheter des bijoux d’occasion.',
      //   project_image: `${baseUrl}/uploads/GEMS.png`,
      //   userId: 1,
      //   repoGitHub: 'https://github.com/Micka90/P3-Gems',
      //   projectLink: 'https://gems-gems.fr/',
      // },
      // {
      //   name: 'Film Fusion',
      //   description:
      //     'Film Fusion est une plateforme dédiée au cinéma, permettant aux utilisateurs de découvrir, partager et discuter de films. Elle offre une interface intuitive pour explorer les dernières sorties, accéder à des informations détaillées sur les films, et interagir avec une communauté de cinéphiles.',
      //   project_image: `${baseUrl}/uploads/Film-fusion.png`,
      //   userId: 1,
      //   repoGitHub: 'https://github.com/Micka90/-P2-FilmFusion',
      //   projectLink: 'https://p2-film-fusion-client.vercel.app/',
      // },
    ];

    for (const project of projects) {
      await this.database.query(
        `INSERT INTO Project (name, description, image, user_iduser, repoGitHub, projectLink) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          project.name,
          project.description,
          project.project_image,
          project.userId,
          project.repoGitHub,
          project.projectLink,
        ]
      );
    }
  }
}

module.exports = ProjectSeeder;
