var express = require('express');
var router = express.Router();
var app = express();
var pg = require('pg');
var db = require('../database');

  module.exports = {
          getReparacion(req,res){
              db.query("SELECT * FROM reparacion").then(response=> {
                  console.log(response.rows)
                  res.json(response.rows);
              }).catch(error =>{
                  console.log(error);
              })
          }

       }
