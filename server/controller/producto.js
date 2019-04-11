var express = require('express');
var router = express.Router();
var app = express();
var pool = require('../database');


module.exports = {

        getProducto(req,res){
          pool.query("SELECT  * FROM producto").then((response)=> {
          console.log(response.rows);
          res.json(response.rows);
          //res.end();
        }).catch((error)=>{
            console.log(error);
          })
        },

        getProductoStock(req,res){
          pool.query("SELECT  * FROM producto WHERE stock >= 1").then((response)=> {
          console.log(response.rows);
          res.json(response.rows);
          //res.end();
        }).catch((error)=>{
            console.log(error);
          })
        },

      postProducto(req, res){
      console.log("PETICION POST");
      console.log(req.body);
      pool.query("INSERT INTO producto(modelo,marca,descripcion,tipoProducto,stock,precio) VALUES($1,$2,$3,$4,$5,$6) RETURNING id_producto",[req.body.modelo,req.body.marca,req.body.descripcion,req.body.tipoProducto,
      req.body.stock,req.body.precio]).then(response=>{
        console.log(response);
        res.json({
          id: response.rows[0].id_producto
        })
      }).catch(error =>{
        console.log(error);
      })
    },

   getIdProducto(req,res){
          pool.query('SELECT * FROM producto WHERE id_producto=($1)', [req.params.id_producto]).then(response=> {
              res.json(response.rows);
          }).catch(error =>{
              console.log(error);
          });
    },

  deleteProducto(req,res){
          console.log(req.params.id_producto);
          pool.query("DELETE FROM producto WHERE id_producto=($1)",[req.params.id_producto]).then(response=>{
              res.json(response.rows);
          }).catch(error =>{
              console.log(error);
          });
        },
  updateProducto(req,res){
          console.log("PETICION UPDATE")
          console.log(req.params.id);
          pool.query("UPDATE producto SET modelo=($1), marca=($2), descripcion=($3), tipoProducto=($4), stock=($5), precio=($6) WHERE id_producto=($7)",[req.body.modelo,req.body.marca,req.body.descripcion,req.body.tipoProducto,
              req.body.stock,req.body.precio, req.params.id_producto]).then((response)=>{
              console.log(response);
              res.json(response.rows);
          }).catch((error)=>{
              console.log(error);
          })
        },

        updateProductoStock(req,res){
                console.log("PETICION UPDATE")
                console.log(req.body);
                pool.query("UPDATE producto SET stock = stock - $1 WHERE id_producto=($2)",[req.body.stock,req.body.id_producto]).then((response)=>{
                    console.log(response);
                    res.json(response.rows);
                }).catch((error)=>{
                    console.log(error);
                })
          }


}
