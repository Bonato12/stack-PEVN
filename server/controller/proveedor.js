var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
const {check, validationResult} = require('express-validator');


config= {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'Telnovo',
  password: '1234',
  port: 5432,
}

module.exports = {
        getProveedor(req,res){
            var pool = new pg.Pool(config);
            pool.connect(function(err, client, done) {
            client.query("SELECT * FROM proveedor")
              .then(response => {
                pool.end();
                res.json(response.rows)
              })
              .catch(error => {
                pool.end();
                console.log(error.stack)
              })
            done()
          })
        },
        postProveedor(req, res){
              const errors = validationResult(req);
              if(!errors.isEmpty()){
                    return res.json(errors.array());
              }else {
                  var pool = new pg.Pool(config)
                  pool.connect(function(err, client, done) {
                  client.query("INSERT INTO proveedor (dni,nombre,apellido,direccion,telefono,mail,descripcion) VALUES($1,$2,$3,$4,$5,$6,$7)",[req.body.dni,req.body.nombre,req.body.apellido,
                  req.body.direccion,req.body.telefono,req.body.mail,req.body.descripcion]).then(response => {
                      pool.end();
                      res.sendStatus(200);
                    })
                    .catch(error => {
                      pool.end();
                      console.log(error)
                      res.send({ msg: 'Error del Servidor No se pudieron guardar los datos!' });
                    })
                  done()
                 })
            }
        },
        getIdProveedor(req,res){
            var pool = new pg.Pool(config)
            pool.connect(function(err, client, done) {
              client.query('SELECT * FROM proveedor WHERE id_proveedor=($1)', [req.params.id_proveedor])
                .then(response => {
                  pool.end();
                  res.json(response.rows);
                })
                .catch(error => {
                  pool.end();
                  console.log(error.stack);
                })
              done()
            })
          },
        deleteProveedor(req,res){
                var pool = new pg.Pool(config)
                pool.connect(function(err, client, done) {
                  client.query("DELETE FROM proveedor WHERE id_proveedor=($1)",[req.params.id_proveedor])
                    .then(response => {
                      pool.end();
                    })
                    .catch(error => {
                      pool.end();
                      console.log(error.stack);
                    })
                  done()
                })
        },
        updateProveedor(req,res){
              const errors = validationResult(req);
              if(!errors.isEmpty()){
                    return res.json(errors.array());
              }else {
                    var pool = new pg.Pool(config)
                    pool.connect(function(err, client, done) {
                      client.query("UPDATE proveedor SET dni=($1), nombre=($2), apellido=($3), direccion=($4), telefono=($5), mail=($6), descripcion=($7) WHERE id_proveedor=($8)", [req.body.dni, req.body.nombre, req.body.apellido,req.body.direccion,req.body.telefono,req.body.mail,req.body.descripcion,req.params.id_proveedor])
                        .then(response => {
                          pool.end()
                          res.sendStatus(200);
                        })
                        .catch(error => {
                          pool.end()
                          res.send({ msg: 'Error del Servidor No se pudieron guardar los datos!' });
                        })
                      done()
                    })
              }
          }

}
