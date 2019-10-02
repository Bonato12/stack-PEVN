import Swal from 'sweetalert2'

export function alertSuccess(){
  Swal.fire( 'Exito!','Guardado Correctamente!','success');
}

export function alertEditSuccess(){
  Swal.fire( 'Exito!','Editado Correctamente!','success');
}

export function alertError(){
   Swal.fire( 'Error!','No Se Pudo Guardar Correctamente!','error');
}

export function alertSucessProveedor(){
   Swal.fire( 'Exito!','Nuevo Proveedor Añadido!','success');
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
  Swal.fire('','Completar los Campos Correctamente','warning');
}

export function alertWarningLimiteOne(){
  Swal.fire('','La Cantidad debe ser al menos de 1','warning');
}

export function alertSucessMail(){
  Swal.fire('Exito!','Mail Enviado Correctamente','success');
}
