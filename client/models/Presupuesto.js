export default class Presupuesto{
    constructor(id_presupuesto,arreglo,observacion,estado,precioTotal){
      this.id_presupuesto =  id_presupuesto,
      this.arreglo = arreglo,
      this.observacion = observacion,
      this.estado = 'EN ESPERA',
      this.precioTotal = precioTotal
    }
}
