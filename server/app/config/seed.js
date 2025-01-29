require('dotenv').config({ path: './server/.env' });

const path = require('path');
const ProjectSeeder = require('../../database/fixtures/ProjectSeeder');
const StackSeeder = require('../../database/fixtures/StackSeeder');
const database = require('../../database/client');

const seedDatabase = async () => {
  try {
    const connectionTest = await database.getConnection();
    console.info('✅ Connected to database successfully!');
    connectionTest.release();

    console.info('🌱 Seeding stacks...');
    const stackSeeder = new StackSeeder(database);
    await stackSeeder.run();
    console.info('✅ Stacks seeded successfully!');

    console.info('🌱 Seeding projects...');
    const projectSeeder = new ProjectSeeder(database);
    await projectSeeder.run();
    console.info('✅ Projects seeded successfully!');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error during seeding:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
};

seedDatabase();
