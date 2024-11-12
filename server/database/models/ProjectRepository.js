class ProjectRepository {
  constructor(database) {
    this.database = database;
  }
  async add(project) {
    const result = await this.database.query(
      'INSERT INTO Project (name, description, image, user_iduser) VALUES (?, ?, ?, ?)',
      [project.name, project.description, project.image, project.user_iduser]
    );
    return result;
  }
}

module.exports = ProjectRepository;
