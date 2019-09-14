var express = require('express');
var router = express.Router();
var app = express();
const pg = require('pg')
const {check, validationResult} = require('express-validator');
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
            client.query("SELECT  * FROM producto WHERE tipoProducto = 'Repuesto' ")
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
             return client.query("SELECT  * FROM producto WHERE stock >= 1 AND tipoProducto <>'Repuesto' ")
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
          var pool = new pg.Pool(config)
          pool.connect(function(err, client, done) {
            client.query("INSERT INTO producto(modelo,marca,descripcion,tipoProducto,stock,precio) VALUES($1,$2,$3,$4,$5,$6) RETURNING id_producto",[req.body.modelo,req.body.marca,req.body.descripcion,req.body.tipoProducto,
            req.body.stock,req.body.precio])
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
                res.json(error.code);
             })
         })
    },

  updateProducto(req,res){
        var pool = new pg.Pool(config)
        pool.connect()
        .then(client => {
          return client.query("UPDATE producto SET modelo=($1), marca=($2), descripcion=($3), tipoProducto=($4), stock=($5), precio=($6) WHERE id_producto=($7)",[req.body.modelo,req.body.marca,req.body.descripcion,req.body.tipoProducto,req.body.stock,req.body.precio, req.params.id_producto])
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
