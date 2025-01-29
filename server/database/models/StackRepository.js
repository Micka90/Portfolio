class StackRepository {
    constructor(database) {
      this.database = database;
    }
  
    async add(stack) {
      const { name, icon } = stack;
      const [result] = await this.database.query(
        'INSERT INTO Stack (name, icon) VALUES (?, ?)',
        [name, icon]
      );
      return result.insertId;
    }
  
    async getAll() {
      const [rows] = await this.database.query('SELECT * FROM Stack');
      return rows;
    }
  
   
  }
  
  module.exports = StackRepository;
  