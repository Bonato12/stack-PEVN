export default class Arreglo{
    constructor(id_arreglo,cliente,producto,fecha,observacion,condicion){
      this.id_arreglo =  id_arreglo,
      this.cliente = cliente,
      this.producto = producto,
      this.fecha = new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear(),
      this.observacion = observacion,
      this.condicion = condicion
    }
}
