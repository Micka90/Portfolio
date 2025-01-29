class ProjectRepository {
  constructor(database) {
    this.database = database;
  }

  async add(project) {
    const { name, description, project_image, userId, repoGitHub, projectLink } = project;
    const [result] = await this.database.query(
      `INSERT INTO Project (name, description, image, user_iduser, repoGitHub, projectLink) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, description, project_image, userId, repoGitHub || 'Non spécifié', projectLink || 'Non spécifié']
    );

    console.log('Database Result:', result);

    if (!result.insertId) {
      throw new Error('L’ID du projet inséré est invalide.');
    }

    return { insertId: result.insertId };
  }

  async getOne(id) {
    const [result] = await this.database.query('SELECT * FROM Project WHERE idProject = ?', [id]);
    return result[0];
  }

  async getAll() {
    const [rows] = await this.database.query('SELECT * FROM Project');
    return rows;
  }
}

module.exports = ProjectRepository;

