var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');

//configuramos postgres con el usuario contraseña y la bd que queremos usar

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Telnovo',
  password: '1234',
  port: 5432,
})


//Realizamos peticiones GET POST DELETE PUT

router.route('/cliente').get((req,res)=>{
      pool.query("SELECT * FROM cliente").then(response=> {
        console.log(response.rows)
        //Muestra los resultados en forma de JSON en nuestro HTML
        res.json(response.rows);
      }).catch(error =>{
        console.log(error);
      })
    });

router.route('/cliente').post((req, res)=> {
      console.log("Peticion POST");
      pool.query("INSERT INTO cliente(dni,nombre,apellido,ciudad,direccion,telefono,mail) VALUES($1,$2,$3,$4,$5,$6,$7)",[req.body.dni,req.body.nombre,req.body.apellido,
      req.body.ciudad,req.body.direccion,req.body.telefono,req.body.mail]).then(response=> {
        console.log(response);
      }).catch(error =>{
        console.log(error);
      })
  });

  router.route('/cliente/:id_cliente').get((req,res)=>{
       pool.query('SELECT * FROM cliente WHERE id_cliente=($1)', [req.params.id_cliente])
      .then(response=> {
        res.json(response.rows);
      }).catch(error =>{
        console.log(error);
      });
  }).delete((req,res)=> {
        console.log("Peticion DELETE");
        pool.query("DELETE FROM cliente WHERE id_cliente=($1)",[req.params.id_cliente]).then(response=> {
        console.log(response.rows)
        res.json(response.rows);
        }).catch(error =>{
          console.log(error);
        })
  }).put((req,res)=>{
        console.log("Peticion UPDATE");
        pool.query("UPDATE cliente SET dni=($1), nombre=($2), apellido=($3), ciudad=($4), direccion=($5), telefono=($6), mail=($7) WHERE id_cliente=($8)", [req.body.dni, req.body.nombre, req.body.apellido,req.body.ciudad,req.body.direccion,req.body.telefono,req.body.mail,req.params.id_cliente]).then(response=> {
        console.log(response.rows)
        res.json(response.rows);
        }).catch(error =>{
          console.log(error);
        })

  });


  //Importamos CORS para poder utilizar Axios en Vue js
  const cors = require('cors');
  app.use(cors());



module.exports = router;
