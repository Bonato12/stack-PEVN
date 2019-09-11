export default class Cliente {
    constructor(id_cliente,dni,nombre,apellido,direccion,telefono,mail){
          this.id_cliente =  id_cliente,
          this.dni = dni,
          this.nombre = nombre,
          this.apellido = apellido,
          this.direccion = direccion,
          this.telefono = telefono,
          this.mail = mail
    }

    getDni() {
        return this.dni;
      }
    
      setDni(dni) {
        this.dni = dni;   // validation could be checked here such as only allowing non numerical values
      }

}
