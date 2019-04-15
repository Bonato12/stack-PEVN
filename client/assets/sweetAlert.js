import Swal from 'sweetalert2'

export function alertSucessCliente(){
   Swal.fire( 'Exito!','Nuevo Cliente Añadido!','success');
}

export function alertSucessProducto(){
   Swal.fire( 'Exito!','Nuevo Producto Añadidossss!','success');
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
