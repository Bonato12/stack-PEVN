export default class Venta{
    constructor(id_venta,cliente,producto,fecha,cantidad,precio){
      this.id_venta =  id_venta,
      this.cliente = cliente,
      this.producto = producto,
      this.fecha = new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear(),
      this.cantidad = cantidad,
      this.precio = precio
    }
}
