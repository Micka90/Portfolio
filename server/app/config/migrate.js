// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Construire le chemin vers le fichier SQL de schéma
const schemaPath = path.join(__dirname, '../../database/schema.sql');
console.log('Schema path:', schemaPath);

// Lire les instructions SQL à partir du fichier de schéma

const schema = fs.readFileSync(schemaPath, 'utf8');  // Lire le contenu du fichier de schéma

// Mettre à jour le schéma de la base de données
const mysql = require('mysql2/promise');

const migrate = async () => {
  try {
    // Créer une connexion spécifique à la base de données
    const database = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      multipleStatements: true, // Permettre l'exécution de plusieurs instructions SQL
    });

    // Supprimer la base de données existante si elle existe
    await database.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME};`);
    // Créer une nouvelle base de données avec le nom spécifié
    await database.query(`CREATE DATABASE ${process.env.DB_NAME};`);
    // Se connecter à la base de données nouvellement créée
    await database.query(`USE ${process.env.DB_NAME};`);

    // Exécuter les instructions SQL pour mettre à jour le schéma de la base de données
    await database.query(schema);

    // Fermer la connexion à la base de données
    database.end();

    console.info(
      `✅ La base de données ${process.env.DB_NAME} a été mise à jour avec succès à partir de '${schemaPath}'.`
    );
  } catch (err) {
    console.error('❌ Erreur lors de la mise à jour de la base de données :', err.message);
    console.error(err.stack);
  }
};

// Exécuter la fonction de migration
migrate();
