const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.landing = (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.render('landing');
};

exports.loginAdmin = (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.render('login', { portalType: 'Admin' });
};

exports.loginStudent = (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.render('login', { portalType: 'Student' });
};

exports.loginPost = (req, res) => {
  const { username, password, role } = req.body;
  User.findByUsernameAndRole(username, role, async (err, results) => {
    if (err) return res.send("Error logging in");
    if (results.length > 0) {
      const match = await bcrypt.compare(password, results[0].password_hash);
      if (match) {
        req.session.user = { id: results[0].id, username: results[0].username, role: results[0].role };
        return res.redirect('/dashboard');
      }
    }
    res.send("Invalid Username, Password, or Role");
  });
};

exports.registerGet = (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.render('register');
};

exports.registerPost = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    User.create(username, hash, (err) => {
      if (err) return res.send("Error registering or username exists.");
      res.redirect('/');
    });
  } catch (err) {
    res.send("Server error");
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
