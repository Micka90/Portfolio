const AbstractSeeder = require('./AbstractSeeder');
const database = require('../client');

class ProjectSeeder extends AbstractSeeder {
  constructor() {
    super({ table: 'Project', truncate: true });
  }

  async run() {
    await this.resetTable();

    const baseUrl = process.env.APP_HOST || 'http://localhost:3000';

    const projects = [
      {
        name: 'GEMS',
        description:
          'Ce projet avait pour objectif de créer une app full stack en respectant les bonnes pratiques de développement.',
        image: `${baseUrl}/uploads/GEMS.png`,
        user_iduser: 1,
        repoGitHub: 'https://github.com/Micka90/P3-Gems',
        projectLink: 'https://gems-gems.fr/',
        refName: 'proj_gems',
      },
      {
        name: 'OUT',
        description:
          'Ce projet est un concept réalisé en 2 jours lors du Protojam 2024 avec le thème « Nature et déconnexion ».',
        image: `${baseUrl}/uploads/out.png`,
        user_iduser: 1,
        repoGitHub: 'https://github.com/Micka90/OUT',
        projectLink: 'https://out-omega-dun.vercel.app/',
        refName: 'proj_out',
      },
      {
        name: 'Film Fusion',
        description:
          'L’objectif était de construire un site web dynamique en utilisant HTML, CSS, React et en récupérant des données à partir d’une API.',
        image: `${baseUrl}/uploads/Film-fusion.png`,
        user_iduser: 1,
        repoGitHub: 'https://github.com/Micka90/-P2-FilmFusion',
        projectLink: 'https://p2-film-fusion-client.vercel.app/',
        refName: 'proj_filmfusion',
      },
      {
        name: 'Wild Social',
        description:
          'Premier projet réalisé lors de ma formation avec HTML, CSS et un peu de JavaScript.',
        image: `${baseUrl}/uploads/Wild-Social.png`,
        user_iduser: 1,
        repoGitHub: 'https://github.com/Micka90/wild-social',
        projectLink: 'https://hamsolovski.github.io/wild-social/',
        refName: 'proj_wildsocial',
      },
    ];

    projects.forEach((project) => this.insert(project));

    await Promise.all(this.promises);

    console.log('✅ Seeding des projets terminé !');

    await database.query("SET FOREIGN_KEY_CHECKS = 0");
    await database.query("TRUNCATE TABLE Project_Stack");
    await database.query("SET FOREIGN_KEY_CHECKS = 1");

    const [allStacks] = await database.query(`SELECT idStack, name FROM Stack`);

    if (allStacks.length === 0) {
      return;
    }

    const projectStacks = [
      {
        projectRef: 'proj_gems',
        stackRefs: [
          'stack_html',
          'stack_css',
          'stack_js',
          'stack_react',
          'stack_node',
          'stack_express',
          'stack_mysql',
        ],
      },
      {
        projectRef: 'proj_out',
        stackRefs: ['stack_html', 'stack_css', 'stack_js', 'stack_react'],
      },
      {
        projectRef: 'proj_filmfusion',
        stackRefs: [
          'stack_html',
          'stack_css',
          'stack_js',
          'stack_react',
          'stack_node',
        ],
      },
      {
        projectRef: 'proj_wildsocial',
        stackRefs: ['stack_html', 'stack_css', 'stack_js'],
      },
    ];

    for (const { projectRef, stackRefs } of projectStacks) {
      const project = this.getRef(projectRef);
      if (!project) continue;

      for (const stackRef of stackRefs) {
        const stack = this.getRef(stackRef);
        if (stack) {
          await database.query(
            'INSERT INTO Project_Stack (idProject, idStack) VALUES (?, ?)',
            [project.insertId, stack.insertId]
          );
        }
      }
    }

    console.log('✅ Seeding des relations projet-stack terminé !');
  }
}

module.exports = ProjectSeeder;
