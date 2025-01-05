class AbstractSeeder {
    constructor(database) {
      this.database = database;
    }
  
    async run() {
      throw new Error('La méthode run() doit être implémentée dans chaque classe fille');
    }
  
    dependencies() {
      return []; 
    }
  }
  
  module.exports = AbstractSeeder;
  