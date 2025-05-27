const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();
const fs = require('fs');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));


app.use(express.json());
// Middleware para dados de formulário (caso use Content-Type: application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));


/*const routesPath = path.join(__dirname, 'routes');

fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith('.js')) {
    const route = require(path.join(routesPath, file));
    console.log(`Carregando rota: ${path.join(routesPath, file)}`);
    console.log(`Carregando rota: ${file}`);
    console.log(`Rota: /${file.split('.')[0]}`);
    console.log(`Carregando rota: ${route}`);
    app.use(`/${file.split('.')[0]}`, route);
  }
});*/


const authRoutes = require('./routes/auth');
app.use('/', authRoutes);
const dashboardRoutes = require('./routes/dashboard');
app.use('/dashboard', dashboardRoutes);

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.sendFile('login.html', { root: 'views' });
});

app.get('/login', (req, res) => {
  if (req.session.user) {
    res.redirect('/dashboard');
  } else {
    res.sendFile('login.html', { root: 'views' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});