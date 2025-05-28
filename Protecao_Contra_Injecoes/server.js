const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const csrf = require('csurf');


const app = express();

app.use(cookieParser());
//app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'chave-secreta',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'Strict', // Proteção SameSite
  }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(csrf({ cookie: true }));

// Middleware de CSRF
/*
const csrfProtection = csrf();
app.use(csrfProtection);*/

/*
function conditionalCsrf(req, res, next) {
  const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
  if (safeMethods.includes(req.method) || req.path === '/api/csrf-token') {
    return next();
  }
  return csrfProtection(req, res, next);
}*/
/*
app.use((req, res, next) => {
  // Permite token para rota de obtenção do token sem erro
  if (req.path === '/api/csrf-token') {
    return csrfProtection(req, res, next);
  }

  // Métodos seguros passam direto (sem validar token)
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  // Para os demais métodos, valida token
  return csrfProtection(req, res, next);
});*/

//app.use(conditionalCsrf);


app.use(express.static('public'));


const USERS = { user: 'senha' };


fs.readdirSync(path.join(__dirname, 'routes')).forEach((file) => {
    if (file.endsWith('.js')) {
        const routes = require(path.join(__dirname, 'routes', file));
        app.use('/', routes);
    }
});

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'views/login.html'));
});

app.get('/login', (_, res) => {
  res.sendFile(path.join(__dirname, 'views/login.html'));
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) return res.status(403).send('Acesso negado');
  res.sendFile(path.join(__dirname, 'views/dashboard.html'));
});

app.get('/change-password', (req, res) => {
  if (!req.session.user) return res.status(403).send('Acesso negado');
  res.sendFile(path.join(__dirname, 'views/change-password.html'));
});

app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado! ' + err.message);
});


app.listen(3000, () => console.log('Servidor em http://localhost:3000'));
