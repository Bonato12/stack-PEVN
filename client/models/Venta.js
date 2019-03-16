export default class Venta{
    constructor(id_venta,cliente,fecha,total){
      this.id_venta =  id_venta,
      this.cliente = cliente,
      this.fecha = new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear(),
      this.total = total
    }
}
