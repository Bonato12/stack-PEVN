var express = require('express');
const cors = require('cors');
var pg = require('pg');
var router = express.Router();
var app = express();


//Importamos CORS para poder utilizar Axios en Vue js

app.use(cors());


//importamos la libreria de postgres

//configuramos postgres con el usuario contraseña y la bd que queremos usar
var conString = "postgres://postgres:1234@localhost/Telnovo" //cadena de conexion

//Para poder usar aplication/json con POSTMAN en PETICIONES POST

router.route('/cliente').
  get(function(req,res){
      res.header("Access-Control-Allow-Origin", "*");
      var client = new pg.Client(conString)
      client.connect();
      client.query("SELECT * FROM cliente").then(response=> {
        console.log(response.rows)
        //Muestra los resultados en forma de JSON en nuestro HTML
        res.json(response.rows);
        client.end()
      }).catch(error =>{
        console.log(error);
        client.end();
      })
    }).
  post((req, res, next)=> {
      res.header("Access-Control-Allow-Origin", "*");
      console.log("PETICION POST");
      console.log(req.body);
      var client = new pg.Client(conString)
      client.connect();
      client.query("INSERT INTO cliente VALUES($1,$2,$3,$4,$5,$6,$7,$8)",[req.body.id_cliente,req.body.dni,req.body.nombre,req.body.apellido,
      req.body.ciudad,req.body.direccion,req.body.telefono,req.body.mail]).then(response=> {
        client.end()
      }).catch(error =>{
        console.log(error);
        client.end();
      })
  });

  router.route('/cliente/:id_cliente').get((req,res)=>{
      var client = new pg.Client(conString);
      console.log("Peticion GET/ID");
      console.log(req.params.id_cliente);
      client.connect();
      //client.query("DELETE FROM cliente WHERE id_cliente = ($1)",[req.params.id_cliente])
       client.query('SELECT * FROM cliente WHERE id_cliente=($1)', [req.params.id_cliente])
      .then(response=> {
        res.json(response.rows);
        client.end()
      }).catch(error =>{
        console.log(error);
        client.end();
      });
  }).delete((req,res)=> {
        console.log("Peticion DELETE");
        var client = new pg.Client(conString);
        client.connect();
        client.query("DELETE FROM cliente WHERE id_cliente=($1)",[req.params.id_cliente]).then(response=> {
        console.log(response.rows)
        res.json(response.rows);
        client.end()
        }).catch(error =>{
          console.log(error);
          client.end();
        })
  }).put((req,res)=>{
        console.log("Peticion PUT");
        console.log(req.params.id_cliente);
        var client = new pg.Client(conString);
        client.connect();
        client.query("UPDATE cliente SET dni=($1), nombre=($2), apellido=($3), ciudad=($4), direccion=($5), telefono=($6), mail=($7) WHERE id_cliente=($8)", [req.body.dni, req.body.nombre, req.body.apellido,req.body.ciudad,req.body.direccion,req.body.telefono,req.body.mail,req.params.id_cliente]).then(response=> {
        console.log(response.rows)
        res.json(response.rows);
        client.end()
        }).catch(error =>{
          console.log(error);
          client.end();
        })

  });

  router.route('/producto').get((req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    var client = new pg.Client(conString)
    client.connect();
    client.query("SELECT * FROM producto").then(response=> {
    console.log(response.rows);
    res.json(response.rows);
    client.end()
    }).catch(error =>{
      console.log(error);
      client.end();
    })
  });

  router.route('/venta').post((req,res)=>{
      res.header("Access-Control-Allow-Origin", "*");
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
  router.route('/venta').get((req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
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
  });

  router.route('/venta/:id_venta').delete((req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
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

  var port = process.env.PORT || 3000
  app.listen(port, ()=>{
    console.log(`Corriendo en el puerto  ${port}`);
  })
