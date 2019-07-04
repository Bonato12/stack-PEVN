import Swal from 'sweetalert2'

export function alertSucessCliente(){
   Swal.fire( 'Exito!','Nuevo Cliente Añadido!','success');
}

export function alertSucessProducto(){
   Swal.fire( 'Exito!','Nuevo Producto Añadidossss!','success');
}

export function alertSucessArreglo(){
   Swal.fire( 'Exito!','Nuevo Arreglo Cargado!','success');
}

export function alertSucessEstado(){
   Swal.fire( 'Exito!','Nuevo Estado Asignado!','success');
}

export function alertSucessPresupuesto(){
   Swal.fire( 'Exito!','Nuevo Presupuesto Cargado!','success');
}

export function alertEditSucessCompra(){
   Swal.fire( 'Exito!','Compra Editada Correctamente!','success');
}


export function alertError(){
   Swal.fire( 'Error!','No Se Pudo Guardar Correctamente!','error');
}



export function alertSucessProveedor(){
   Swal.fire( 'Exito!','Nuevo Proveedor Añadido!','success');
}

export function alertSucessVenta(){
   Swal.fire( 'Exito!','Nueva Venta Añadida!','success');
}

export function alertCompletarCampos(){
  Swal.fire( 'Error!','Completar los Campos Vacios!','error');
}

export function alertSucessDelete(){
  Swal.fire('Eliminado!','Ha sido elimando','success');
}

export function alertWarningLimite(){
  Swal.fire('','Limite de Productos Permitidos','warning');
}

export function alertWarningLimiteStock(){
  Swal.fire('','Limite de Stock Disponible','warning');
}

export function alertWarningFK(){
  Swal.fire('','No se puede eliminar ya que a realizado venta','warning');
}

export function alertWarningArregloFK(){
  Swal.fire('','No se puede eliminar ya que posee un presupuesto','warning');
}

export function alertWarningCompletarCampos(){
  Swal.fire('','Completar los Campos','warning');
}

export function alertWarningLimiteOne(){
  Swal.fire('','La Cantidad debe ser al menos de 1','warning');
}

export function alertEdit(){
  Swal.fire({
  title: 'Seguro que desea Editar?',
  text: "No podra recuperar los datos!",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, Editar'
  });
}

export function alertEditSucessProveedor(){
  Swal.fire('Editado!','El Proveedor ha sido Editado!','success');
}

export function alertEditSucessProducto(){
  Swal.fire('Editado!','El Producto ha sido Editado!','success');
}

export function alertEditSucessCliente(){
  Swal.fire('Editado!','El Cliente ha sido Editado!','success');
}
