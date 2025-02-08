require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const schemaPath = path.join(__dirname, '../../database/schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

const migrate = async () => {
  try {
    const database = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      multipleStatements: true,
    });

    if (process.env.NODE_ENV !== 'production') {
      await database.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME};`);
    } else {
    }

    await database.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`
    );
    await database.query(`USE ${process.env.DB_NAME};`);
    await database.query(schema);

    console.info(
      `✅ La base de données ${process.env.DB_NAME} a été migrée avec succès.`
    );
  } catch (err) {
    console.error('❌ Erreur de migration :', err.message);
  }
};

migrate();
