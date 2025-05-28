const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const verifyReferer = require('../middlewares/verifyReferer');
const csrfProtection = require('csurf')();

router.post('/login', csrfProtection, verifyReferer, async (req, res) => {
  const { username, password } = req.body;
  
  const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [username, password]);
  
  if (rows.length > 0) {
    req.session.user = rows[0].id;
    res.redirect('/dashboard');
  } else {
    res.send('Login inválido');
  }

});

router.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.sendFile('dashboard.html', { root: 'views' });
  } else {
    res.redirect('/');
  }
});

module.exports = router;