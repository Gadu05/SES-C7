const express = require('express');
const router = express.Router();
const db = require('../database/connection');
const verifyReferer = require('../middlewares/verifyReferer');

router.post('/change-password', verifyReferer, async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.send('As senhas não coincidem');
  }

  const user = req.session.user;
  const [rows] = await db.execute('SELECT * FROM usuarios WHERE id = ? AND senha = ?', [user, oldPassword]);

  if (rows.length > 0) {
    await db.execute('UPDATE usuarios SET senha = ? WHERE id = ?', [newPassword, user]);
    res.send('Senha alterada com sucesso'
      + '<br><a href="/dashboard">Voltar ao painel</a>'
    );
  } else {
    res.send('Senha antiga incorreta'
      + '<br><a href="/change-password">Tentar novamente</a>'
      + '<br><a href="/dashboard">Voltar ao painel</a>'
    );
  }

});

router.get('/change-password', (req, res) => {
  if (req.session.user) {
    res.sendFile('change-password.html', { root: 'views' });
  } else {
    res.redirect('/');
  }
});

module.exports = router;