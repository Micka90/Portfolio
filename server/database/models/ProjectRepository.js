class ProjectRepository {
  constructor(database) {
    this.database = database;
  }
  async add(project) {
    const { name, description, project_image, userId } = project;
    console.log('SQL Parameters:', [name, description, project_image, userId]);
    const result = await this.database.query(
      `INSERT INTO Project (name, description, image, user_iduser) VALUES (?, ?, ?, ?)`,
      [name, description, project_image, userId]
    );
    return result;
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
