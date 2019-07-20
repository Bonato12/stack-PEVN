var express = require('express');
var router = express.Router();
var pg = require('pg');

config= {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'Telnovo',
  password: '1234',
  port: 5432,
}


var pool = new pg.Pool(config);
pool.query('SELECT NOW()', (err, res) => {
  console.log("Conexion Exitosa "+ res.rows[0].now)
  pool.end()
})


module.exports = config ;
