CREATE TABLE usuario(
	id_usuario SERIAL NOT NULL,
	uuid VARCHAR(100) NOT NULL UNIQUE,
	mail VARCHAR(30) NOT NULL,
	contraseña VARCHAR(30) NOT NULL,
	rol INTEGER NOT NULL,
	CONSTRAINT pk_id_usuario PRIMARY KEY (id_usuario),
	CONSTRAINT fk_id_rol FOREIGN KEY(rol) REFERENCES rol(id_rol)
);

CREATE TABLE rol(
	id_rol SERIAL NOT NULL,
	perfil VARCHAR(30) NOT NULL,
	CONSTRAINT pk_id_rol PRIMARY KEY (id_rol)
);

CREATE TABLE cliente(
	id_cliente SERIAL NOT NULL,
	dni INTEGER NOT NULL,
	nombre VARCHAR(30) NOT NULL,
	apellido VARCHAR(30) NOT NULL,
	direccion VARCHAR(30) NOT NULL,
	telefono VARCHAR(30) NOT NULL,
	mail VARCHAR(30) NOT NULL,
	CONSTRAINT pk_id_cliente PRIMARY KEY (id_cliente)
);


CREATE TABLE proveedor(
	id_proveedor SERIAL NOT NULL,
	dni INTEGER NOT NULL,
	nombre VARCHAR(30) NOT NULL,
	apellido VARCHAR(30) NOT NULL,
	direccion VARCHAR(30) NOT NULL,
	telefono VARCHAR(30) NOT NULL,
	mail VARCHAR(30) NOT NULL,
	descripcion VARCHAR(30) NOT NULL,
	CONSTRAINT pk_id_proveedor PRIMARY KEY (id_proveedor)
);


CREATE TABLE producto(
	id_producto SERIAL NOT NULL,
	modelo VARCHAR(30) NOT NULL,
	marca VARCHAR(30) NOT NULL,
	descripcion VARCHAR(30) NOT NULL,
	tipoProducto VARCHAR(30) NOT NULL,
	stock INTEGER NOT NULL,
	precio INTEGER NOT NULL,
	check(stock>=0),
	CONSTRAINT pk_id_producto PRIMARY KEY(id_producto)
);

CREATE TABLE venta(
	id_venta SERIAL NOT NULL,
	id_cliente INTEGER NOT NULL,
	fecha DATE NOT NULL,
	total INTEGER NOT NULL,
	CONSTRAINT pk_id_venta PRIMARY KEY(id_venta),
	CONSTRAINT fk_id_cliente FOREIGN KEY(id_cliente) REFERENCES cliente(id_cliente)
);

CREATE TABLE ventaProducto(
	id_ventaProducto SERIAL NOT NULL,
	id_venta INTEGER NOT NULL,
	id_producto INTEGER NOT NULL,
	cantidad INTEGER NOT NULL,
	precio INTEGER NOT NULL,
	CONSTRAINT pk_idProducto PRIMARY KEY(id_ventaProducto),
	CONSTRAINT fk_id_venta FOREIGN KEY(id_venta) REFERENCES venta(id_venta) ON DELETE CASCADE,
	CONSTRAINT fk_id_producto FOREIGN KEY(id_producto) REFERENCES producto(id_producto)
);

CREATE TABLE presupuesto(
	id_presupuesto SERIAL NOT NULL,
	arreglo INTEGER NOT NULL,
	observacion VARCHAR(100) NOT NULL,
	estado VARCHAR(100) NOT NULL,
	precioManoObra INTEGER NOT NULL,
	precioTotal INTEGER NOT NULL,
	CONSTRAINT pk_id_presupuesto PRIMARY KEY(id_presupuesto),
	CONSTRAINT fk_arreglo FOREIGN KEY(arreglo) REFERENCES arreglo(id_arreglo)
);

CREATE  TABLE presupuestoProducto(
	id_presupuestoProducto SERIAL NOT NULL,
	presupuesto INTEGER NOT NULL,
	producto INTEGER NOT NULL,
	cantidad INTEGER NOT NULL,
	precio INTEGER NOT NULL,
	CONSTRAINT pk_id_presupuesto_producto PRIMARY KEY(id_presupuestoProducto),
	CONSTRAINT fk_id_presupuesto FOREIGN KEY(presupuesto) REFERENCES presupuesto(id_presupuesto)  ON DELETE CASCADE,
	CONSTRAINT fk_id_producto_presupuesto FOREIGN KEY(producto) REFERENCES producto(id_producto)
);

CREATE TABLE compra(
	id_compra SERIAL NOT NULL,
	id_proveedor INTEGER NOT NULL,
	fecha DATE NOT NULL,
	total INTEGER NOT NULL,
	CONSTRAINT pk_id_compra PRIMARY KEY(id_compra),
	CONSTRAINT fk_id_proveedor FOREIGN KEY(id_proveedor) REFERENCES proveedor(id_proveedor)
);

CREATE TABLE compraProducto(
	id_compraProducto SERIAL NOT NULL,
	id_compra INTEGER NOT NULL,
	id_producto INTEGER NOT NULL,
	cantidad INTEGER NOT NULL,
	precioUnitario INTEGER NOT NULL,
	precioTotal INTEGER NOT NULL,
	CONSTRAINT pk_idcompraProducto PRIMARY KEY(id_compraProducto),
	CONSTRAINT fk_id_compra FOREIGN KEY(id_compra) REFERENCES compra(id_compra)  ON DELETE CASCADE,
	CONSTRAINT fk_id_producto FOREIGN KEY(id_producto) REFERENCES producto(id_producto)
);

CREATE TABLE arreglo(
	id_arreglo SERIAL NOT NULL,
	cliente INTEGER NOT NULL,
	producto INTEGER NOT NULL,
	fecha DATE NOT NULL,
	observacion VARCHAR(100) NOT NULL,
	condicion VARCHAR (100) NOT NULL,
	CONSTRAINT pk_idArreglo PRIMARY KEY(id_arreglo),
	CONSTRAINT fk_id_clienteA FOREIGN KEY(cliente) REFERENCES cliente(id_cliente),
	CONSTRAINT fk_id_productoA FOREIGN KEY(producto) REFERENCES producto(id_producto)
);

CREATE  TABLE reparacion(
	id_reparacion Serial NOT NULL,
	fecha_ini date NOT NULL,
	fecha_fin date,
	id_presupuesto integer NOT NULL,
	check(fecha_fin>=fecha_ini),
	constraint pk_reparacion primary key (id_reparacion),
	constraint fk_presupuesto foreign key (id_presupuesto) references presupuesto(id_presupuesto)
);


/* TRIGGER DE ACTUALIZAR STOCK DESPUES DE LA VENTA*/

/*TRIGGER 1 */

CREATE OR REPLACE FUNCTION trigger_stock() RETURNS TRIGGER AS $funcemp$
BEGIN
		UPDATE producto SET stock = stock - new.cantidad WHERE id_producto = new.id_producto ;
RETURN NEW;
END;
$funcemp$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_pagar_deuda AFTER INSERT ON ventaproducto
FOR each row execute procedure trigger_stock()

/* TRIGGER 2 */

CREATE OR REPLACE FUNCTION trigger_eliminar_venta() RETURNS TRIGGER AS $funcemp$
BEGIN
		UPDATE producto SET stock = stock + OLD.cantidad WHERE id_producto = old.id_producto ;
RETURN NEW;
END;
$funcemp$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_eliminar_venta AFTER DELETE ON ventaproducto
FOR each row execute procedure trigger_eliminar_venta()

/* TRIGGER DE ACTUALIZAR STOCK DESPUES DE LA COMPRA*/

CREATE OR REPLACE FUNCTION trigger_compra_stock() RETURNS TRIGGER AS $funcemp$
BEGIN
		UPDATE producto SET stock = stock + new.cantidad WHERE id_producto = new.id_producto ;
RETURN NEW;
END;
$funcemp$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_stock_compra AFTER INSERT ON compraproducto
FOR each row execute procedure trigger_compra_stock()


/* TRIGGER DE ESTADOS DE ARREGLOS */


/*trigger 0 */

CREATE OR REPLACE FUNCTION func_d() RETURNS TRIGGER AS $funcemp$
DECLARE 
BEGIN 
		UPDATE arreglo SET condicion = 'EN ESPERA DE PRESUPUESTO' where arreglo.id_arreglo = OLD.arreglo;
RETURN OLD;
END; $funcemp$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_delete AFTER DELETE ON presupuesto
FOR EACH ROW EXECUTE PROCEDURE func_d();
 
 
/*trigger 1*/ 
CREATE OR REPLACE FUNCTION func_e() RETURNS TRIGGER AS $funcemp$
DECLARE 
BEGIN 
		UPDATE arreglo SET condicion = 'EN EVALUACION DE PRESUPUESTO' where arreglo.id_arreglo = NEW.arreglo;
RETURN NEW;
END; $funcemp$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_e BEFORE INSERT ON presupuesto
FOR EACH ROW EXECUTE PROCEDURE func_e();
 
/*trigger 2*/ 

CREATE OR REPLACE FUNCTION func_H() RETURNS TRIGGER AS $funcemp$
DECLARE 
BEGIN 
IF NEW.ESTADO='ACEPTADO' THEN
	UPDATE arreglo SET condicion = 'PRESUPUESTO ACEPTADO: EN REPARACION' where arreglo.id_arreglo = NEW.arreglo;
	INSERT INTO reparacion values (DEFAULT, CURRENT_DATE,null,new.id_presupuesto);
END IF;
IF new.ESTADO='CANCELADO' THEN
	UPDATE arreglo SET condicion = 'PRESUPUESTO CANCELADO' where arreglo.id_arreglo = NEW.arreglo;
end if;
RETURN NEW;
END; $funcemp$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_H BEFORE UPDATE ON presupuesto
FOR EACH ROW EXECUTE PROCEDURE func_H();

/*trigger 3 */

CREATE OR REPLACE FUNCTION func_R() RETURNS TRIGGER AS $funcemp$
DECLARE 
BEGIN 
IF NEW.fecha_fin is not null THEN
    UPDATE arreglo SET condicion= 'REPARACION TERMINADA' where 
	arreglo.id_arreglo = (select p.arreglo from presupuesto p where p.id_presupuesto=new.id_presupuesto);
END IF;
RETURN NEW;
END; $funcemp$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_R AFTER UPDATE ON reparacion
FOR EACH ROW EXECUTE PROCEDURE func_R();


/* CONSULTAS Y INCERCIONES */

/* INSERTAR EL ROL Y EL USUARIO PARA PODER LOGUEARSE CORRECTAMENTE */

INSERT INTO rol VALUES(DEFAULT,'ADMINISTRADOR');
INSERT INTO usuario VALUES(DEFAULT,'vUprTUCcPshg7o4excvfTyTIa1j2','papita@gmail.com',123456,1)




SELECT * FROM usuario;

select p.arreglo from presupuesto p where p.id_presupuesto=(select id_presupuesto from reparacion where id_reparacion=8)

SELECT PP.id_presupuestoproducto,PR.modelo,PP.cantidad,PP.precio FROM presupuestoProducto PP, producto PR WHERE PP.producto = PR.id_producto

SELECT * FROM presupuestoproducto;

SELECT id_reparacion,producto.id_producto, presupuesto.id_presupuesto, cliente.dni, to_char( fecha_ini, 'DD-MM-YYYY') as fecha_ini,to_char( fecha_fin, 'DD-MM-YYYY') as fecha_fin
FROM reparacion, arreglo, presupuesto,cliente,producto
where (arreglo.id_arreglo=presupuesto.arreglo)and(presupuesto.id_presupuesto=reparacion.id_presupuesto)
and(arreglo.cliente=cliente.id_cliente)and(arreglo.producto=producto.id_producto)

SELECT * FROM presupuesto

