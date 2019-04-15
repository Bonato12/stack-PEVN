var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var pool = require('../database');


//Realizamos peticiones GET POST DELETE PUT

  module.exports = {

          getCliente(req,res){
              pool.query("SELECT * FROM cliente").then(response=> {
                console.log(response.rows)
                //Muestra los resultados en forma de JSON en nuestro HTML
                res.json(response.rows);
              }).catch(error =>{
                console.log(error);
              })
        },

        postCliente(req, res){
              console.log("Peticion POST");
              const cliente = {
                dni: req.body.dni,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                mail: req.body.mail
              }
              pool.query("INSERT INTO cliente(dni,nombre,apellido,direccion,telefono,mail) VALUES($1,$2,$3,$4,$5,$6) RETURNING id_cliente",[cliente.dni,cliente.nombre,cliente.apellido,
              cliente.direccion,cliente.telefono]).then(response=> {
                console.log(response);
                res.json({
                  id: response.rows[0].id_cliente,
                  status: 200
                })
              }).catch((error) =>{
                console.log(error);
                res.json({
                  status: 500
                })
              });
        },
        getIdCliente(req,res){
             pool.query('SELECT * FROM cliente WHERE id_cliente=($1)', [req.params.id_cliente])
            .then(response=> {
              res.json(response.rows);
            }).catch(error =>{
              console.log(error);
            });
          },
        deleteCliente(req,res){
                console.log("Peticion DELETE");
                pool.query("DELETE FROM cliente WHERE id_cliente=($1)",[req.params.id_cliente]).then(response=> {
                res.json({
                  mensaje: 'Eliminado Correctamente'
                })
                }).catch(error =>{
                  console.log(error);
                })
        },
        updateCliente(req,res){
              console.log("Peticion UPDATE");
              pool.query("UPDATE cliente SET dni=($1), nombre=($2), apellido=($3), direccion=($4), telefono=($5), mail=($6) WHERE id_cliente=($7)", [req.body.dni, req.body.nombre, req.body.apellido,req.body.direccion,req.body.telefono,req.body.mail,req.params.id_cliente]).then(response=> {
              //res.json(response.rows);
              res.json({
                mensaje: "Editado Correctamente"
              })
              }).catch(error =>{
                console.log(error);
              });
            }

}
