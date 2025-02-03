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
          'Ce projet avait pour objectif de créer une app full stack en respectant les bonnes pratiques de développement. Projet que j’ai présenté à mon passage de titre professionnel.',
        project_image: `${baseUrl}/uploads/GEMS.png`,
        userId: 1,
        repoGitHub: 'https://github.com/Micka90/P3-Gems',
        projectLink: 'https://gems-gems.fr/',
        stacks: [
          'HTML',
          'CSS',
          'JavaScript',
          'React',
          'Node.js',
          'Express',
          'MySQL',
        ],
      },

      {
        name: 'OUT',
        description:
          'Ce projet est un concept réalisée en 2 jours lors du Protojam 2024 avec le thème « Nature et déconnexion » - toutes les fonctionnalités sont présentées à titre d’exemples',
        project_image: `${baseUrl}/uploads/out.png`,
        userId: 1,
        repoGitHub: 'https://github.com/Micka90/OUT',
        projectLink: 'https://out-omega-dun.vercel.app/',
        stacks: ['HTML', 'CSS', 'JavaScript', 'React'],
      },

      {
        name: 'Film Fusion',
        description:
          'L’objectif était de construire un site web dynamique en utilisant les technologies suivantes : HTML, CSS, React, et en récupérant des données à partir d’une API.',
        project_image: `${baseUrl}/uploads/Film-fusion.png`,
        userId: 1,
        repoGitHub: 'https://github.com/Micka90/-P2-FilmFusion',
        projectLink: 'https://p2-film-fusion-client.vercel.app/',
        stacks: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
      },

      {
        name: 'Wild Social',
        description:
          'Premier projet réaliser lors de ma formation l’objectif était de crée un site statique  en  utilisant HTML , CSS et un peu de JavaScript',
        project_image: `${baseUrl}/uploads/Wild-Social.png`,
        userId: 1,
        repoGitHub: 'https://github.com/Micka90/wild-social',
        projectLink: 'https://hamsolovski.github.io/wild-social/',
        stacks: ['HTML', 'CSS', 'JavaScript'],
      },
    ];

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

      const selectedStacks = allStacks.filter((stack) =>
        project.stacks.includes(stack.name)
      );

      for (const stack of selectedStacks) {
        await this.database.query(
          'INSERT INTO Project_Stack (idProject, idStack) VALUES (?, ?)',
          [projectId, stack.idStack]
        );
      }
    }

    console.log('✅ Seeding des projets terminé !');
  }
}

module.exports = ProjectSeeder;
