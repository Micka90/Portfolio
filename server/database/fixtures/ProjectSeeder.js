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
        stacks: ['HTML', 'CSS', 'JavaScript', 'React'],
      },
      {
        name: 'Film Fusion',
        description:
          'Film Fusion est une plateforme dédiée au cinéma, permettant aux utilisateurs de découvrir, partager et discuter de films.',
        project_image: `${baseUrl}/uploads/Film-fusion.png`,
        userId: 1,
        repoGitHub: 'https://github.com/Micka90/-P2-FilmFusion',
        projectLink: 'https://p2-film-fusion-client.vercel.app/',
        stacks: ['HTML', 'CSS', 'Node.js', 'MySQL'],
      },
    ];

    console.log('🌱 Seeding projects...');

    const [allStacks] = await this.database.query(
      `SELECT idStack, name FROM Stack`
    );

    if (allStacks.length === 0) {
      console.log('⚠️ Aucune stack disponible en base de données !');
      return;
    }

    for (const project of projects) {
      const [result] = await this.database.query(
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

      const projectId = result.insertId;
      // console.log(`✅ Projet inséré : ${project.name} (ID: ${projectId})`);

      const selectedStacks = allStacks.filter((stack) =>
        project.stacks.includes(stack.name)
      );

      for (const stack of selectedStacks) {
        await this.database.query(
          'INSERT INTO Project_Stack (idProject, idStack) VALUES (?, ?)',
          [projectId, stack.idStack]
        );
        // console.log(`✅ Stack ${stack.name} (ID: ${stack.idStack}) associée à ${project.name}`);
      }
    }

    console.log('✅ Seeding des projets terminé !');
  }
}

module.exports = ProjectSeeder;
