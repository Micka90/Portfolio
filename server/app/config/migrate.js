require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const schemaPath = path.join(__dirname, '../../database/schema.sql');
// console.log('Schema path:', schemaPath);

const schema = fs.readFileSync(schemaPath, 'utf8');

const mysql = require('mysql2/promise');

const migrate = async () => {
  try {
    const database = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      multipleStatements: true,
    });

    await database.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME};`);

    await database.query(`CREATE DATABASE ${process.env.DB_NAME};`);

    await database.query(`USE ${process.env.DB_NAME};`);

    await database.query(schema);

    database.end();

    console.info(
      `✅ La base de données ${process.env.DB_NAME} a été mise à jour avec succès à partir de '${schemaPath}'.`
    );
  } catch (err) {
    console.error(
      '❌ Erreur lors de la mise à jour de la base de données :',
      err.message
    );
    console.error(err.stack);
  }
};

migrate();
