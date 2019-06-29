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
    getIdCliente(){
        return this.id_cliente;
    }

    setIdCliente(id_cliente){
        this.id_cliente = id_cliente;
    }

    getDni(){
        return this.dni;
    }

    setDni(dni){
        this.dni = dni;
    }

}
