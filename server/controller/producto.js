var express = require('express');
var router = express.Router();
var app = express();
var pool = require('../database');


module.exports = {

        listarproductos(req,res){
          pool.query("SELECT  * FROM producto").then((response)=> {
          console.log(response.rows);
          res.json(response.rows);
          //res.end();
        }).catch((error)=>{
            console.log(error);
          })
        },

  addproductos(req, res){
      console.log("PETICION POST");
      console.log(req.body);
      pool.query("INSERT INTO producto(modelo,descripcion,tipoProducto,stock,precio) VALUES($1,$2,$3,$4,$5)",[req.body.modelo,req.body.descripcion,req.body.tipoProducto,
      req.body.stock,req.body.precio]).then(response=>{
        console.log(response);
      }).catch(error =>{
        console.log(error);
      })
    },

   getidproducto(req,res){
          pool.query('SELECT * FROM producto WHERE id_producto=($1)', [req.params.id_producto]).then(response=> {
              res.json(response.rows);
          }).catch(error =>{
              console.log(error);
          });
    },

  deleteproducto(req,res){
          console.log(req.params.id_producto);
          pool.query("DELETE FROM producto WHERE id_producto=($1)",[req.params.id_producto]).then(response=>{
              res.json(response.rows);
          }).catch(error =>{
              console.log(error);
          });
        },
  updateproducto(req,res){
          console.log("PETICION UPDATE")
          console.log(req.params.id);
          pool.query("UPDATE producto SET modelo=($1), descripcion=($2), tipoProducto=($3), stock=($4), precio=($5) WHERE id_producto=($6)",[req.body.modelo,req.body.descripcion,req.body.tipoProducto,
              req.body.stock,req.body.precio, req.params.id_producto]).then((response)=>{
              console.log(response);
              res.json(response.rows);
          }).catch((error)=>{
              console.log(error);
          })
        }

}
