const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // *** CÓDIGO VUNERÁVEL ***
  //const [rows] = await db.execute(`SELECT * FROM usuarios WHERE email = '${username}' AND senha = '${password}'`);
  
  // *** PREPARED STATEMENTS ***
  const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [username, password]);
  
  if (rows.length > 0) {
    req.session.user = rows[0].id;
    res.redirect('/dashboard');
  } else {
    res.send('Login inválido');
  }

});

router.get('/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/dashboard');
  } else {
    res.render('login');
  }
});

/*router.get('/dashboard', (req, res) => {
  if (req.session.user) {
    res.render('dashboard', { user: req.session.user });
  } else {
    res.redirect('/');
  }
});*/

module.exports = router;