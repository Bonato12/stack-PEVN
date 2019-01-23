var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
//configuramos postgres con el usuario contraseña y la bd que queremos usar
/*
const conexionDB = {
  user: 'postgres',
  host: 'localhost',
  database: 'Telnovo',
  password: '1234',
  port: 5432,
}
*/
  //var client = new pg.Client(conexionDB);

  const Pool = require('pg').Pool
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Telnovo',
    password: '1234',
    port: 5432,
  })


  router.route('/producto').get((req,res)=>{
    //client.connect();
    pool.query("SELECT * FROM producto").then((response)=> {
    console.log(response.rows);
    res.json(response.rows);
    //res.end();
    //client.end();
  }).catch((error)=>{
      console.log(error);
      //client.end();
    })
  }).post((req, res)=> {
      console.log("PETICION POST");
      console.log(req.body);
      //client.connect();
      pool.query("INSERT INTO producto(modelo,descripcion,tipoProducto,stock,precio) VALUES($1,$2,$3,$4,$5)",[req.body.modelo,req.body.descripcion,req.body.tipoProducto,
      req.body.stock,req.body.precio]).then(response=>{
      res.json(response.rows);
      //client.end();
      }).catch(error =>{
        console.log(error);
        //client.end();
      })
  });

  router.route('/producto/:id_producto').delete((req,res)=>{
    console.log(req.params.id_producto);
    //client.connect();
    pool.query("DELETE FROM producto WHERE id_producto=($1)",[req.params.id_producto]).then(response=>{
    res.json(response.rows);
    //client.end();
    }).catch(error =>{
      console.log(error);
      //client.end();
    })
  })


  //Importamos CORS para poder utilizar Axios en Vue js
  const cors = require('cors');
  app.use(cors());



module.exports = router;
