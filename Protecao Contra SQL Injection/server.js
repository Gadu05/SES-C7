const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

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


const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

app.get('/', (req, res) => {
  res.sendFile('login.html', { root: 'views' });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});