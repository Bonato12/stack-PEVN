var express = require('express');
const pg = require('pg')
var config = require('../database');

module.exports = {

        getProducto(req,res){
          var pool = new pg.Pool(config)
          pool.connect(function(err, client, done) {
            client.query("SELECT  * FROM producto")
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

        getProductoRepuesto(req,res){
          var pool = new pg.Pool(config)
          pool.connect(function(err, client, done) {
            client.query("SELECT  * FROM producto WHERE tipo_producto = 'Repuesto' ")
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

        getProductoStock(req,res){
            var pool = new pg.Pool(config)
            pool.connect()
            .then(client => {
             return client.query("SELECT  * FROM producto WHERE stock >= 1 AND tipo_producto <>'Repuesto' ")
               .then(response => {
                 pool.end();
                 res.json(response.rows)
               })
               .catch(error => {
                 pool.end();
                 console.log(error.stack)
               })
           })
        },

        getProductoReparar(req,res){
          var pool = new pg.Pool(config)
          pool.connect()
          .then(client => {
           return client.query("SELECT  * FROM producto WHERE tipo_producto = 'Para Reparacion' ")
             .then(response => {
               pool.end();
               res.json(response.rows)
             })
             .catch(error => {
               pool.end();
               console.log(error.stack)
             })
         })
      },  

      postProducto(req, res){
          const producto = {
            modelo:req.body.modelo,
            marca:req.body.marca,
            descripcion:req.body.descripcion,
            tipoProducto:req.body.tipoProducto,
            stock:req.body.stock,
            precio:req.body.precio
          }
          var pool = new pg.Pool(config)
          pool.connect(function(err, client, done) {
            client.query("INSERT INTO producto(modelo,marca,descripcion,tipo_producto,stock,precio) VALUES($1,$2,$3,$4,$5,$6) RETURNING id_producto",[producto.modelo,producto.marca,producto.descripcion,producto.tipoProducto,
            producto.stock,producto.precio])
              .then(response => {
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
    },

   getIdProducto(req,res){
          var pool = new pg.Pool(config)
          pool.connect()
          .then(client => {
           return client.query('SELECT * FROM producto WHERE id_producto=($1)', [req.params.id_producto])
             .then(response => {
               pool.end()
               res.json(response.rows)
             })
             .catch(error => {
               pool.end()
               console.log(error.stack)
             })
         })
    },

  deleteProducto(req,res){
          console.log("Hola");
          var pool = new pg.Pool(config)
          pool.connect()
          .then(client => {
           return client.query("DELETE FROM producto WHERE id_producto=($1)",[req.params.id_producto])
             .then(response => {
              pool.end();
              res.sendStatus(200);
             })
             .catch(error => {
                pool.end();
                console.log(error);
                if (error.code == 23503){
                  res.send({ msg:"No se puede eliminar ya que el producto esta en una venta o una compra"});
                }else{
                  res.send({ msg: "Error de servidor no se pueden actualizar los datos"});
                }
             })
         })
    },

  updateProducto(req,res){
        const productoAct = {
          modelo:req.body.modelo,
          marca:req.body.marca,
          descripcion:req.body.descripcion,
          tipoProducto:req.body.tipoProducto,
          stock:req.body.stock,
          precio:req.body.precio
        }
        var pool = new pg.Pool(config)
        pool.connect().then(client => {
          return client.query("UPDATE producto SET modelo=($1), marca=($2), descripcion=($3), tipo_producto=($4), stock=($5), precio=($6) WHERE id_producto=($7)",[productoAct.modelo,productoAct.marca,productoAct.descripcion,productoAct.tipoProducto,productoAct.stock,productoAct.precio, req.params.id_producto])
          .then(response => {
            pool.end();
            res.sendStatus(200);
          })
          .catch(error => {
            pool.end();
            console.log(error)
            res.send({ msg: 'Error del Servidor No se pudieron guardar los datos!' });
          })
        })
    }
}
