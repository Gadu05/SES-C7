const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

const port = 3000;
const db = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados MySQL como id ' + db.threadId);
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'senhasegura',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    //const sql = 'SELECT * FROM user WHERE email = ? AND senha = ?';
    const sql = `SELECT * FROM user WHERE email = '${username}' AND senha = '${password}'`;
    console.log('SQL:', sql);
    //db.query(sql, [username, password], (err, results) => {
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta: ' + err.stack);
            res.status(500).send('Erro no servidor');
            return;
        }
        if (results.length > 0) {
            req.session.user = results[0];
            res.send('Login bem-sucedido!');
        } else {
            res.send('Usuário ou senha inválidos');
        }
    });
});


app.listen(port, () => console.log(`Servidor em http://localhost:${port}`));