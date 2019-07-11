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

          getCompra(req,res){
              var pool = new pg.Pool(config)
              pool.connect(function(err, client, done) {
                client.query("SELECT pr.nombre, pr.apellido,to_char( c.fecha, 'DD-MM-YYYY') as fecha, c.total, c.id_compra FROM proveedor pr,  compra c WHERE pr.id_proveedor = c.id_proveedor")
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

        postCompra(req, res){
          /*
            console.log("Peticion POST");
            console.log(req.body);
            for (var i=0; i < req.body.lista.length; i++){
                console.log(req.body.lista[i]);
            }
            db.query("INSERT INTO compra(id_proveedor,fecha,total) VALUES($1,$2,$3) RETURNING id_compra",[req.body.compra.proveedor.id_proveedor,req.body.compra.fecha,req.body.compra.total]).then(response=> {
                id = parseInt(response.rows[0].id_compra);
                console.log("EL ID INSERTADO ES:"+id);
                      for (var i=0 ; i < req.body.lista.length ; i++) {
                          db.query("INSERT INTO compraProducto(id_compra,id_producto,cantidad,precio) VALUES($1,$2,$3,$4) RETURNING id_compra",[id,req.body.lista[i].producto.id_producto,req.body.lista[i].cantidad,req.body.lista[i].precio]).then(response=> {
                              console.log(response);
                          }).then(
                            db.query("UPDATE producto SET stock = stock + $1 WHERE id_producto=($2)",[req.body.lista[i].cantidad,req.body.lista[i].producto.id_producto]).then(response =>{
                                 console.log(response);
                               })
                          ).catch((error) =>{
                              console.log(error);
                          });
                      }
            }).catch((error) =>{
                console.log(error);
            });

            */
            var pool = new pg.Pool(config)
            pool.connect(function(err, client, done) {
              client.query("INSERT INTO compra(id_proveedor,fecha,total) VALUES($1,$2,$3) RETURNING id_compra",[req.body.compra.proveedor.id_proveedor,req.body.compra.fecha,req.body.compra.total]).then(response=> {
                  id = parseInt(response.rows[0].id_compra);
                  pool.end();
                  console.log("EL ID INSERTADO ES:"+id);
                        for (var i=0 ; i < req.body.lista.length ; i++) {
                            db.query("INSERT INTO compraProducto(id_compra,id_producto,cantidad,precioUnitario,precioTotal) VALUES($1,$2,$3,$4,$5) RETURNING id_compra",[id,req.body.lista[i].producto.id_producto,req.body.lista[i].cantidad,req.body.lista[i].precioUnitario,req.body.lista[i].precioTotal]).then(response=> {
                                pool.end();
                                console.log(response);
                            }).then(
                              db.query("UPDATE producto SET stock = stock + $1 WHERE id_producto=($2)",[req.body.lista[i].cantidad,req.body.lista[i].producto.id_producto]).then(response =>{
                                   pool.end();
                                   console.log(response);
                                 })
                            ).catch((error) =>{
                                pool.end();
                                console.log(error);
                            });
                        }
                      }).catch((error) =>{
                          pool.end();
                          console.log(error);
                      });
              done()
            })

        },
        deleteCompra(req,res){
                var pool = new pg.Pool(config)
                pool.connect(function(err, client, done) {
                  client.query("DELETE FROM compra WHERE id_compra=($1)",[req.params.id_compra])
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
          getIdCompra(req,res){
              var pool = new pg.Pool(config)
              pool.connect(function(err, client, done) {
                client.query('SELECT V.id_compra,V.id_proveedor, V.fecha ,V.total  FROM compra V WHERE V.id_compra=($1)', [req.params.id_compra])
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

          updateCompra(req, res){
                var pool = new pg.Pool(config)
                pool.connect(function(err, client, done) {
                  client.query("UPDATE compra SET  fecha = ($1) WHERE id_compra = ($2)",[req.body.fecha,req.params.id_compra])
                    .then(response => {
                      pool.end()
                    })
                    .catch(error => {
                      pool.end()
                      console.log(error.stack)
                    })
                  done()
                })
          },


       }
