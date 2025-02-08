require('dotenv').config({ path: './server/.env' });
const ProjectSeeder = require('../../database/fixtures/ProjectSeeder');
const StackSeeder = require('../../database/fixtures/StackSeeder');
const database = require('../../database/client');

const seedDatabase = async () => {
  try {
    const connectionTest = await database.getConnection();
    connectionTest.release();

    await new StackSeeder(database).run();
    await new ProjectSeeder(database).run();
  } catch (err) {
    console.error('❌ Error during seeding:', err);
  } finally {
    database.end();
  }
};

seedDatabase();

