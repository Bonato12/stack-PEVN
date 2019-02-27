var express = require('express');
var router = express.Router();
var app = express();
var pool = require('../database');


  module.exports = {
          listaproveedores(req,res){
          pool.query("SELECT * FROM proveedores").then(response=> {
            console.log(response.rows)
            //Muestra los resultados en forma de JSON en nuestro HTML
            res.json(response.rows);
          }).catch(error =>{
            console.log(error);
          })
        },

        addproveedor(req, res){
              console.log("Peticion POST");
              pool.query("INSERT INTO cliente(dni,nombre,apellido,ciudad,direccion,telefono,mail) VALUES($1,$2,$3,$4,$5,$6,$7)",[req.body.dni,req.body.nombre,req.body.apellido,
              req.body.ciudad,req.body.direccion,req.body.telefono,req.body.mail]).then(response=> {
                console.log(response);
              }).catch((error) =>{
                console.log(error);
              });
        },
        getidproveedor(req,res){
             pool.query('SELECT * FROM proveedor WHERE id_proveedor=($1)', [req.params.id_proveedor])
            .then(response=> {
              res.json(response.rows);
            }).catch(error =>{
              console.log(error);
            });
          },
        deleteproveedor(req,res){
                console.log("Peticion DELETE");
                pool.query("DELETE FROM proveedor WHERE id_proveedor=($1)",[req.params.id_proveedor]).then(response=> {
                console.log(response.rows)
                res.json(response.rows);
                }).catch(error =>{
                  console.log(error);
                })
        },
        updateproveedor(req,res){
              console.log("Peticion UPDATE");
              pool.query("UPDATE proveedor SET dni=($1), nombre=($2), apellido=($3), ciudad=($4), direccion=($5), telefono=($6), mail=($7) WHERE id_proveedor=($8)", [req.body.dni, req.body.nombre, req.body.apellido,req.body.ciudad,req.body.direccion,req.body.telefono,req.body.mail,req.params.id_cliente]).then(response=> {
              console.log(response.rows)
              res.json(response.rows);
              }).catch(error =>{
                console.log(error);
              });
            }

}
