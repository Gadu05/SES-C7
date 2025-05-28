const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const verifyReferer = require('../middlewares/verifyReferer');

// GET login
router.get('/login', verifyReferer(), (req, res) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.render('login', { error: null, csrfToken: req.csrfToken() });
});

// POST login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const [rows] = await db.execute(
    'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
    [username, password]
  );

  if (rows.length > 0) {
    req.session.user = rows[0].id;
    res.redirect('/dashboard');
  } else {
    res.render('login', { error: 'Login inválido', csrfToken: req.csrfToken() });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

module.exports = router;
