const express = require('express');

const sha256 = require('sha256'); 
const cors = require('cors');
const { Pool, Client } = require('pg');

const app = express();
app.use(cors());

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'data',
  password: 'postgres',
  port: 5432,
});

client.connect();

app.get('/login', (req, response) => {
  const { login, passwd } = req.query;
  client.query('select * from users where login = $1 and passwd = $2', [login, sha256(passwd)], (err, res) => {
    if (err) {
      response.send(err)
    };
    response.send(res.rows[0]);
  })

});

app.listen(8080);