const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'senhasegura',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static('public'));

const USERS = { user: 'senha' };

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'views/login.html'));
});

app.get('/login', (_, res) => {
  res.sendFile(path.join(__dirname, 'views/login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (USERS[username] === password) {
    req.session.user = username;
    res.redirect('/dashboard');
  } else {
    res.send('Login inválido');
  }
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.status(403).send('Acesso negado');
  res.sendFile(path.join(__dirname, 'view/dashboard.html'));
});

app.post('/change-password', (req, res) => {
  if (!req.session.user) return res.status(403).send('Acesso negado');
  // Simula alteração de senha
  console.log(`Senha alterada para ${req.body.newPassword}`);
  res.send('Senha alterada com sucesso');
});

app.listen(3000, () => console.log('Servidor em http://localhost:3000'));
