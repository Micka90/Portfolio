class UserRepository {
  constructor(database) {
    this.database = database;
  }

  async add(user) {
    const [result] = await this.database.query(
      'INSERT INTO user (name, email, password, is_admin) VALUES (?, ?, ?, ?)',
      [user.name, user.email, user.hashedPassword, user.is_admin]
    );
    return [result];
  }

  async readByEmailWithPassword(email) {
    const [rows] = await this.database.query(
      `SELECT * FROM user WHERE email = ?`,
      [email]
    );
    return rows[0];
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM user WHERE iduser = ?`,
      [id]
    );
    return rows[0];
  }
}

module.exports = UserRepository;
