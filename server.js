const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import database
const db = require('./models');

// Create Express app
const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(ejsLayouts);
app.set('layout', 'layouts/main');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add path to res.locals for navigation highlighting
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// Routes
const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');

app.use('/', publicRoutes);
app.use('/admin', adminRoutes);

// Error handling middleware
app.use((req, res) => {
  res.status(404).render('error', { 
    title: 'Page Not Found', 
    message: 'The page you are looking for does not exist.' 
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    title: 'Server Error', 
    message: 'Something went wrong on our end. Please try again later.' 
  });
});

// Set port
const PORT = process.env.PORT || 3000;

// Sync database and start server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = app;