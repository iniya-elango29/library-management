const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from ../public
app.use(express.static(path.join(__dirname, '../public')));

// Set views directory to ../views
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Session configuration
app.use(session({
  secret: 'library_super_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

// Middleware to inject session into locals for EJS
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Routes
app.use('/', userRoutes);
app.use('/', bookRoutes);
app.use('/', transactionRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
