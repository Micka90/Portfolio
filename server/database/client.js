const mysql = require('mysql2/promise');

const client = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client.checkConnection = async () => {
  try {
    const connection = await client.getConnection();
    console.info(`✅ Connected to database: ${process.env.DB_NAME}`);
    connection.release();
  } catch (error) {
    console.error('❌ Failed to connect to the database.');
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = client;
