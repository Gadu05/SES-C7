const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const verifyReferer = require('../middlewares/verifyReferer');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const authRequired = require('../middlewares/authRequired');

router.get('/dashboard', authRequired, (req, res) => {
  if (req.session.user) {
    res.sendFile('dashboard.html', { root: 'views' });
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