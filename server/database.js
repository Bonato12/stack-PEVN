var pg = require('pg');



const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'Telnovo',
  password: '1234',
  port: 5432,
})

module.exports = pool;
