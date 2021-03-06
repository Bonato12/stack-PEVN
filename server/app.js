var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();



var clienteRouter = require('./routes/cliente');
var productoRouter = require('./routes/producto');
var ventaRouter = require('./routes/venta');
var mailRouter = require('./routes/mail');
var proveedorRouter = require('./routes/proveedor');
var adminRouter = require('./routes/administrar');
var ventaProductoRouter =require('./routes/ventaProducto');
var compraRouter = require('./routes/compra');
var compraProductoRouter = require('./routes/compraProducto');
var arregloRouter = require('./routes/arreglo');
var presupuestoRouter = require('./routes/presupuesto');
var presupuestoProductoRouter = require('./routes/presupuestoProducto');
var reparacionRouter = require('./routes/reparacion');

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}
app.use(allowCrossDomain);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', clienteRouter);
app.use('/', productoRouter);
app.use('/', ventaRouter);
app.use('/', mailRouter);
app.use('/', proveedorRouter);
app.use('/', adminRouter);
app.use('/', ventaProductoRouter);
app.use('/', compraProductoRouter);
app.use('/', compraRouter);
app.use('/', arregloRouter);
app.use('/', presupuestoRouter);
app.use('/', presupuestoProductoRouter);
app.use('/', reparacionRouter);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
