var express = require('express');
var router = express.Router();
var app = express();
const ventaController = require('../controller/venta');

router.get('/venta', ventaController.listaventas);
router.post('/venta',ventaController.addventas);


/*
const conexionDB = {
  user: 'postgres',
  host: 'localhost',
  database: 'Telnovo',
  password: '1234',
  port: 5432,
}


  router.route('/venta').get((req,res)=>{
    console.log("PETICION GET");
    var client = new pg.Client(conexionDB);
    client.connect();
    client.query('SELECT cl.nombre, cl.apellido, pr.modelo, pr.precio, vt.fecha, vt.id_venta FROM cliente cl, producto pr, venta vt WHERE cl.id_cliente = vt.id_cliente AND pr.id_producto= vt.id_producto').then(response=>{
    res.json(response.rows);
    client.end()
    }).catch(error=>{
      console.log(error);
      client.end();
    })
  }).post((req,res)=>{
      console.log("PETICION POST");
      console.log(req.body);
      var cliente = new pg.Client(conexionDB);
      cliente.connect();
      cliente.query("INSERT INTO venta VALUES($1,$2,$3,$4)",[req.body.id_venta,req.body.id_cliente,req.body.id_producto,req.body.fecha]).then(response=>{
      cliente.end();
      }).catch(error=>{
        console.log(error);
        cliente.end();
      })
  });

  router.route('/venta/:id_venta').delete((req,res)=>{
    console.log(req.params.id_venta);
    var client = new pg.Client(conexionDB);
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

*/

const cors = require('cors');
app.use(cors());

module.exports = router;
