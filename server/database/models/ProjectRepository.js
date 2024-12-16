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

  async getAll() {
    const [rows] = await this.database.query('SELECT * FROM Project');
    return rows; 
  }
}

 


module.exports = ProjectRepository;
