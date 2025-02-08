const database = require('./client');

const UserRepository = require('./models/UserRepository');
const ProjectRepository = require('./models/ProjectRepository');
const StackRepository = require('./models/StackRepository');

const tables = {};

tables.user = new UserRepository(database);
tables.project = new ProjectRepository(database);
tables.stack = new StackRepository(database);

tables.database = database;

module.exports = new Proxy(tables, {
  get(obj, prop) {
    if (prop in obj) return obj[prop];
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});
