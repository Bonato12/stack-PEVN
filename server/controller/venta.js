var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var id;

config= {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'Telnovo',
  password: '1234',
  port: 5432,
}


module.exports = {

          getVenta(req,res){
              var pool = new pg.Pool(config)
              pool.connect(function(err, client, done) {
                client.query("SELECT cl.nombre, cl.apellido,to_char( vt.fecha, 'DD-MM-YYYY') as fecha, vt.total, vt.id_venta FROM cliente cl,  venta vt WHERE cl.id_cliente = vt.id_cliente")
                  .then(response => {
                    pool.end()
                    res.json(response.rows)
                  })
                  .catch(error => {
                    pool.end()
                    console.log(error.stack)
                  })
                done()
              })
          },

          postVenta(req, res){
                  console.log("Peticion POST");
                  console.log(req.body);
                  for (var i=0; i < req.body.lista.length; i++){
                      console.log(req.body.lista[i]);
                  }
                  var pool = new pg.Pool(config)
                  pool.query("INSERT INTO venta(id_cliente,fecha,total) VALUES($1,$2,$3) RETURNING id_venta",[req.body.venta.cliente.id_cliente,req.body.venta.fecha,req.body.venta.total]).then(response=> {
                      id = parseInt(response.rows[0].id_venta);
                      console.log("EL ID INSERTADO ES:"+id);
                            for (var i=0 ; i < req.body.lista.length ; i++) {
                                pool.query("INSERT INTO ventaProducto(id_venta,id_producto,cantidad,precio) VALUES($1,$2,$3,$4) RETURNING id_venta",[id,req.body.lista[i].producto.id_producto,req.body.lista[i].cantidad,req.body.lista[i].precio]).then(response=> {
                                    console.log(response);
                                }).then(
                                  pool.query("UPDATE producto SET stock = stock - $1 WHERE id_producto=($2)",[req.body.lista[i].cantidad,req.body.lista[i].producto.id_producto]).then(response =>{
                                       console.log(response);
                                     })
                                ).catch((error) =>{
                                    console.log(error);
                                });
                            }
                  }).catch((error) =>{
                      pool.end();
                      console.log(error);
                  });

            },

        deleteVenta(req,res){
                console.log("Peticion DELETE");
                var pool = new pg.Pool(config)
                pool.connect(function(err, client, done) {
                  client.query("DELETE FROM venta WHERE id_venta=($1)",[req.params.id_venta])
                    .then(response => {
                      pool.end()
                      res.json(response.rows)
                    })
                    .catch(error => {
                      pool.end()
                      console.log(error.stack)
                    })
                  done()
                })
        },
          getIdVenta(req,res){
              var pool = new pg.Pool(config)
              pool.connect(function(err, client, done) {
                client.query('SELECT V.id_venta,V.id_cliente, V.fecha ,V.total  FROM venta V WHERE V.id_venta=($1)', [req.params.id_venta])
                  .then(response => {
                    pool.end()
                    res.json(response.rows)
                  })
                  .catch(error => {
                    pool.end()
                    console.log(error.stack)
                  })
                done()
              })
            },
          updateVenta(req, res){
                console.log(req.body);
                db.query("UPDATE venta SET fecha = ($1) WHERE id_venta = ($2)",[req.body.fecha,req.params.id_venta]).then(response=> {
                  res.json({
                      mensaje: "Editado Correctamente"
                  })
                }).catch((error) =>{
                    console.log(error);
                });

                var pool = new pg.Pool(config)
                pool.connect(function(err, client, done) {
                  client.query("UPDATE venta SET fecha = ($1) WHERE id_venta = ($2)",[req.body.fecha,req.params.id_venta])
                    .then(response => {
                      pool.end()
                      //res.json(response.rows)
                    })
                    .catch(error => {
                      pool.end()
                      console.log(error.stack)
                    })
                  done()
                })
          },


       }
