const database = require("../client");

const refs = {}; 
class AbstractSeeder {
  constructor({ table, truncate = true, dependencies = [] }) {
    if (this.constructor === AbstractSeeder) {
      throw new TypeError("AbstractSeeder ne peut pas être instancié directement");
    }

    this.table = table;
    this.truncate = truncate;
    this.dependencies = dependencies;
    this.promises = [];
    this.refs = refs;
  }

  async #doInsert(data) {
    const { refName, ...values } = data;
    const fields = Object.keys(values).join(",");
    const placeholders = new Array(Object.keys(values).length).fill("?").join(",");
    const sql = `INSERT INTO ${this.table}(${fields}) VALUES (${placeholders})`;

    const [result] = await database.query(sql, Object.values(values));

    if (refName != null) {
      refs[refName] = { ...values, insertId: result.insertId };
    }
  }

  insert(data) {
    this.promises.push(this.#doInsert(data));
  }

  getRef(name) {
    return refs[name];
  }

  async run() {
    throw new Error("La méthode run() doit être implémentée dans chaque classe fille");
  }

  async resetTable() {
    if (this.truncate) {
      console.log(`🗑 Suppression des données de la table ${this.table}...`);
      await database.query(`SET FOREIGN_KEY_CHECKS = 0`); 
      await database.query(`TRUNCATE TABLE ${this.table}`);
      await database.query(`SET FOREIGN_KEY_CHECKS = 1`);
      console.log(`✅ Table ${this.table} vidée !`);
    }
  }
}

module.exports = AbstractSeeder;
