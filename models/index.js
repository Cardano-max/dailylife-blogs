const Sequelize = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Sequelize with MySQL database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Post = require('./Post')(sequelize, Sequelize);

module.exports = db;