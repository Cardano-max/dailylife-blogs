const Sequelize = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Sequelize with MySQL database
const sequelize = new Sequelize(
  process.env.DB_NAME || process.env.MYSQLDATABASE,
  process.env.DB_USER || process.env.MYSQLUSER,
  process.env.DB_PASS || process.env.MYSQLPASSWORD,
  {
    host: process.env.DB_HOST || process.env.MYSQLHOST,
    port: process.env.DB_PORT || process.env.MYSQLPORT || 3306,
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      },
      connectTimeout: 60000
    }
  }
);

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    // Log connection details in non-production environment
    if (process.env.NODE_ENV !== 'production') {
      console.log('Database config:', {
        database: process.env.DB_NAME || process.env.MYSQLDATABASE,
        user: process.env.DB_USER || process.env.MYSQLUSER,
        host: process.env.DB_HOST || process.env.MYSQLHOST,
        port: process.env.DB_PORT || process.env.MYSQLPORT || 3306
      });
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    console.error('Database config:', {
      database: process.env.DB_NAME || process.env.MYSQLDATABASE,
      user: process.env.DB_USER || process.env.MYSQLUSER,
      host: process.env.DB_HOST || process.env.MYSQLHOST,
      port: process.env.DB_PORT || process.env.MYSQLPORT || 3306
    });
  }
};

testConnection();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Post = require('./Post')(sequelize, Sequelize);

module.exports = db;