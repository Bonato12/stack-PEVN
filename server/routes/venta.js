var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
//configuramos postgres con el usuario contraseña y la bd que queremos usar
var conString = "postgres://postgres:1234@localhost/Telnovo" //cadena de conexion

  router.route('/venta').get((req,res)=>{
    console.log("PETICION GET");
    var client = new pg.Client(conString);
    client.connect();
    client.query('SELECT cl.nombre, cl.apellido, pr.modelo, vt.fecha, vt.id_venta FROM cliente cl, producto pr, venta vt WHERE cl.id_cliente = vt.id_cliente AND pr.id_producto= vt.id_producto').then(response=>{
    res.json(response.rows);
    client.end()
    }).catch(error=>{
      console.log(error);
      client.end();
    })
  }).post((req,res)=>{
      console.log("PETICION POST");
      console.log(req.body);
      var client = new pg.Client(conString);
      client.connect();
      client.query("INSERT INTO venta VALUES($1,$2,$3,$4)",[req.body.id_venta,req.body.id_cliente,req.body.id_producto,req.body.fecha]).then(response=>{
      client.end()
      }).catch(error=>{
        console.log(error);
        client.end();
      })
  });

  router.route('/venta/:id_venta').delete((req,res)=>{
    console.log(req.params.id_venta);
    var client = new pg.Client(conString);
    client.connect();
    client.query("DELETE FROM venta WHERE id_venta=($1)",[req.params.id_venta]).then(response=>{
    res.json(response.rows);
    client.end();
    }).catch(error =>{
      console.log(error);
      client.end();
    })
  })



  //Importamos CORS para poder utilizar Axios en Vue js
  const cors = require('cors');
  app.use(cors());



module.exports = router;
