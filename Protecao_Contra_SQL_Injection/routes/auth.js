const express = require('express');
const router = express.Router();
const db = require('../database/connection');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // *** CÓDIGO VUNERÁVEL ***
  const [rows] = await db.execute(`SELECT * FROM usuarios WHERE email = '${username}' AND senha = '${password}'`);
  
  // *** PREPARED STATEMENTS ***
  //const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [username, password]);
  
  if (rows.length > 0) {
    req.session.user = rows[0];
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