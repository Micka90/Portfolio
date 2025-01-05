const AbstractSeeder = require('./AbstractSeeder');

class ProjectSeeder extends AbstractSeeder {
  dependencies() {
    return []; 
  }

  async run() {
    const projects = [
      {
        name: 'Project 1',
        description: 'Description for project 1',
        project_image: 'https://via.placeholder.com/150',
        userId: 1, 
        repoGitHub: 'https://github.com/user/project1',
        projectLink: 'https://project1.example.com',
      },
      {
        name: 'Project 2',
        description: 'Description for project 2',
        project_image: 'https://via.placeholder.com/150',
        userId: 1, 
        repoGitHub: 'https://github.com/user/project2',
        projectLink: 'https://project2.example.com',
      },
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
