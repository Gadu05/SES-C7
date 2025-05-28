const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Configurações
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessão
app.use(session({
  secret: 'chave-secreta',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'Strict'
  }
}));

// CSRF
const csrfProtection = csrf({ cookie: false });
app.use(csrfProtection);

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware global para enviar o token para as views
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Views e arquivos estáticos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// CSRF aplicado globalmente (exceto na rota de API)
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  csrfProtection(req, res, next);
});

// Middleware para passar token CSRF automático nas views
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Importação dinâmica das rotas
fs.readdirSync(path.join(__dirname, 'routes'))
  .filter(file => file.endsWith('.js'))
  .forEach(file => {
    const route = require(path.join(__dirname, 'routes', file));
    app.use(route);
  });

// Rotas principais
app.get('/', (req, res) => {
  res.render('login', { error: null });
});

app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

/*
app.get('/session-test', (req, res) => {
  if (!req.session.visits) req.session.visits = 1;
  else req.session.visits++;

  res.send(`Número de visitas nesta sessão: ${req.session.visits}`);
});*/

// Erro CSRF específico
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).send('Formulário adulterado!');
  } else {
    console.error(err.stack);
    res.status(500).send('Algo deu errado! ' + err.message);
  }
});

// Inicia o servidor
app.listen(3000, () => console.log('Servidor em http://localhost:3000'));
