import Swal from 'sweetalert2'

export function alertSucessCliente(){
   Swal.fire( 'Exito!','Nuevo Cliente Añadido!','success');
}

export function alertSucessProducto(){
   Swal.fire( 'Exito!','Nuevo Producto Añadidossss!','success');
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
