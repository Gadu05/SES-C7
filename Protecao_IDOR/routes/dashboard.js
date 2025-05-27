const express = require('express');
const router = express.Router();
const db = require('../../Protecao_Contra_SQL_Injection/database/connection');
const verificaAutenticacao = require('../middlewares/isAuth');

/*router.post('/dashboard', verificaAutenticacao, async (req, res) => {
  //const { username, password } = req.body;
  
  const [rows] = await db.execute('SELECT * FROM usuarios WHERE id = ?', [req.session.user]);
  
  if (rows.length > 0) {
    res.redirect('/dashboard');
  } else {
    res.send('Login inválido');
  }

});*/

router.get('/dashboard', verificaAutenticacao, async (req, res) => {
  const userId = req.user;

  if (!userId) {
    res.render('/dashboard', { user: req.session.user });
    return;
  }

  try {
    const [rows] = await db.execute(
      'SELECT * FROM usuarios WHERE id = ?',
      [userId]
    );

    if (rows.length > 0) {
      res.render('dashboard', { user: rows[0] });
    } else {
      res.send('Usuário não encontrado');
    }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).send('Erro interno no servidor');
  }
});


module.exports = router;