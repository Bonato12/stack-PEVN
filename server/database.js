var express = require('express');
var router = express.Router();
const Pool = require('pg').Pool


config= {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'Telnovo',
  password: '1234',
  port: 5432,
}

const db = new Pool(config);





module.exports = db;
