export default class Compra{
  constructor(id_compra,proveedor,fecha,total){
    this.id_compra =  id_compra,
    this.proveedor = proveedor,
    this.fecha = new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear(),
    this.total = total
  }
}
