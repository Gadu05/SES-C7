const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const authRequired = require('../middlewares/authRequired');

router.get('/dashboard', authRequired, async (req, res) => {
  if (req.session.user) {

    //const userId = req.session.user;
    //const userId = req.query.id;

    const userId = req.query.id || req.session.user;

    if (!userId) {
      return res.status(400).send('ID do usuário não fornecido');
    }

    const [rows] = await db.execute(
      'SELECT * FROM usuarios WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).send('Usuário não encontrado');
    }

    res.render('dashboard', { user: rows[0] });

  } else {
    res.redirect('/');
  }

});

router.get('/session-test', (req, res) => {
    if (!req.session.visits) {
        req.session.visits = 1;
    } else {
        req.session.visits++;
    }
    res.send(`Sessão ativa. Visitas: ${req.session.visits}`);
});

module.exports = router;