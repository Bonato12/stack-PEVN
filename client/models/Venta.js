export default class Venta{
    constructor(id_venta,id_cliente,id_producto,fecha,cantidad,precio){
      this.id_venta =  id_venta,
      this.id_cliente = id_cliente,
      this.id_producto = id_producto,
      this.fecha = new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear(),
      this.cantidad = cantidad,
      this.precio = precio
    }
}
