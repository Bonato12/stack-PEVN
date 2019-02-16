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
    pool.query("SELECT  * FROM producto").then((response)=> {
    console.log(response.rows);
    res.json(response.rows);
    //res.end();
  }).catch((error)=>{
      console.log(error);
    })
  }).post((req, res)=> {
      console.log("PETICION POST");
      console.log(req.body);
      pool.query("INSERT INTO producto(modelo,descripcion,tipoProducto,stock,precio) VALUES($1,$2,$3,$4,$5)",[req.body.modelo,req.body.descripcion,req.body.tipoProducto,
      req.body.stock,req.body.precio]).then(response=>{
        console.log(response);
      }).catch(error =>{
        console.log(error);
      })
  });

  router.route('/producto/:id_producto').get((req,res)=>{
          pool.query('SELECT * FROM producto WHERE id_producto=($1)', [req.params.id_producto]).then(response=> {
              res.json(response.rows);
          }).catch(error =>{
              console.log(error);
          });
  }).delete((req,res)=>{
          console.log(req.params.id_producto);
          pool.query("DELETE FROM producto WHERE id_producto=($0)",[req.params.id_producto]).then(response=>{
              res.json(response.rows);
          }).catch(error =>{
              console.log(error);
          });
  }).put((req,res)=>{
          console.log("PETICION UPDATE")
          console.log(req.params.id);
          pool.query("UPDATE producto SET modelo=($1), descripcion=($2), tipoProducto=($3), stock=($4), precio=($5) WHERE id_producto=($6)",[req.body.modelo,req.body.descripcion,req.body.tipoProducto,
              req.body.stock,req.body.precio, req.params.id_producto]).then((response)=>{
              console.log(response);
              res.json(response.rows);
          }).catch((error)=>{
              console.log(error);
          })
  });


  //Importamos CORS para poder utilizar Axios en Vue js
  const cors = require('cors');
  app.use(cors());



module.exports = router;
