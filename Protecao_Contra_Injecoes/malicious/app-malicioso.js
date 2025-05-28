const express = require('express');
const path = require('path');
const app = express();

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'views/dashboard.html'));
});

app.use(express.static('public'));

app.listen(3001, () => {
    console.log('Servidor malicioso rodando na porta 3001 - http://localhost:3001');
});
