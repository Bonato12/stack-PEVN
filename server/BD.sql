CREATE TABLE rol(
	id_rol SERIAL NOT NULL,
	perfil VARCHAR(30) NOT NULL,
	CONSTRAINT pk_id_rol PRIMARY KEY (id_rol)
);

CREATE TABLE usuario(
	id_usuario SERIAL NOT NULL,
	uuid VARCHAR(100) NOT NULL UNIQUE,
	mail VARCHAR(30) NOT NULL,
	contraseña VARCHAR(30) NOT NULL,
	rol INTEGER NOT NULL,
	CONSTRAINT pk_id_usuario PRIMARY KEY (id_usuario),
	CONSTRAINT fk_id_rol FOREIGN KEY(rol) REFERENCES rol(id_rol)
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
	descripcion VARCHAR(200) NOT NULL,
	tipo_producto VARCHAR(30) NOT NULL,
	stock INTEGER NOT NULL,
	precio INTEGER NOT NULL,
	CHECK(stock>=0),
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

CREATE TABLE venta_producto(
	id_venta_producto SERIAL NOT NULL,
	id_venta INTEGER NOT NULL,
	id_producto INTEGER NOT NULL,
	cantidad INTEGER NOT NULL,
	precio INTEGER NOT NULL,
	CONSTRAINT pk_id_venta_producto PRIMARY KEY(id_venta_producto),
	CONSTRAINT fk_id_venta FOREIGN KEY(id_venta) REFERENCES venta(id_venta) ON DELETE CASCADE,
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


CREATE TABLE presupuesto(
	id_presupuesto SERIAL NOT NULL,
	arreglo INTEGER NOT NULL,
	observacion VARCHAR(100) NOT NULL,
	estado VARCHAR(100) NOT NULL,
	precio_mano_obra INTEGER NOT NULL,
	precio_total INTEGER NOT NULL,
	CONSTRAINT pk_id_presupuesto PRIMARY KEY(id_presupuesto),
	CONSTRAINT fk_arreglo FOREIGN KEY(arreglo) REFERENCES arreglo(id_arreglo) ON DELETE CASCADE
);

CREATE  TABLE presupuesto_producto(
	id_presupuesto_producto SERIAL NOT NULL,
	presupuesto INTEGER NOT NULL,
	producto INTEGER NOT NULL,
	cantidad INTEGER NOT NULL,
	precio INTEGER NOT NULL,
	CONSTRAINT pk_id_presupuesto_producto PRIMARY KEY(id_presupuesto_producto),
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

CREATE TABLE compra_producto(
	id_compra_producto SERIAL NOT NULL,
	id_compra INTEGER NOT NULL,
	id_producto INTEGER NOT NULL,
	cantidad INTEGER NOT NULL,
	precio_unitario INTEGER NOT NULL,
	precio_total INTEGER NOT NULL,
	CONSTRAINT pk_id_compra_producto PRIMARY KEY(id_compra_producto),
	CONSTRAINT fk_id_compra FOREIGN KEY(id_compra) REFERENCES compra(id_compra)  ON DELETE CASCADE,
	CONSTRAINT fk_id_producto FOREIGN KEY(id_producto) REFERENCES producto(id_producto)
);


CREATE  TABLE reparacion(
	id_reparacion Serial NOT NULL,
	fecha_ini date NOT NULL,
	fecha_fin date,
	id_presupuesto integer NOT NULL,
	CHECK (fecha_fin>=fecha_ini),
	CONSTRAINT pk_reparacion PRIMARY KEY (id_reparacion),
	CONSTRAINT fk_presupuesto FOREIGN KEY(id_presupuesto) REFERENCES presupuesto(id_presupuesto) ON DELETE CASCADE
);


/* TRIGGER DE ACTUALIZAR STOCK*/

/*TRIGGER 1 */

CREATE OR REPLACE FUNCTION trigger_stock() RETURNS TRIGGER AS $funcemp$
BEGIN
		UPDATE producto SET stock = stock - new.cantidad WHERE id_producto = new.id_producto ;
RETURN NEW;
END;
$funcemp$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_pagar_deuda AFTER INSERT ON venta_producto
FOR each row execute procedure trigger_stock()

/*TRIGGER 2 */


CREATE OR REPLACE FUNCTION trigger_stock_presupuesto() RETURNS TRIGGER AS $funcemp$
BEGIN
		UPDATE producto SET stock = stock - new.cantidad WHERE id_producto = new.producto ;
RETURN NEW;
END;
$funcemp$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_stock_presupuesto AFTER INSERT ON presupuesto_producto
FOR each row execute procedure trigger_stock_presupuesto()


/* TRIGGER 3 */

CREATE OR REPLACE FUNCTION trigger_eliminar_venta() RETURNS TRIGGER AS $funcemp$
BEGIN
		UPDATE producto SET stock = stock + OLD.cantidad WHERE id_producto = old.id_producto;
RETURN NEW;
END;
$funcemp$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_eliminar_venta AFTER DELETE ON venta_producto
FOR each row execute procedure trigger_eliminar_venta()




/* TRIGGER DE ACTUALIZAR STOCK DESPUES DE LA COMPRA*/

CREATE OR REPLACE FUNCTION trigger_compra_stock() RETURNS TRIGGER AS $funcemp$
BEGIN
		UPDATE producto SET stock = stock + new.cantidad WHERE id_producto = new.id_producto ;
		UPDATE producto SET precio = new.precio_unitario WHERE id_producto = new.id_producto ;

RETURN NEW;
END;
$funcemp$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_stock_compra AFTER INSERT ON compra_producto
FOR each row execute procedure trigger_compra_stock()


CREATE OR REPLACE FUNCTION trigger_compra_delete_stock() RETURNS TRIGGER AS $funcemp$
BEGIN
		UPDATE producto SET stock = stock - OLD.cantidad WHERE id_producto = OLD.id_producto ;
		UPDATE producto SET precio = OLD.precio_unitario WHERE id_producto = OLD.id_producto ;

RETURN OLD;
END;
$funcemp$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_stock_delete_compra AFTER DELETE ON compra_producto
FOR each row execute procedure trigger_compra_delete_stock()


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
    UPDATE arreglo SET condicion= 'REPARACION TERMINADA' WHERE 
	arreglo.id_arreglo = (SELECT P.arreglo from presupuesto P WHERE P.id_presupuesto=NEW.id_presupuesto);
END IF;
RETURN NEW;
END; $funcemp$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_R AFTER UPDATE ON reparacion
FOR EACH ROW EXECUTE PROCEDURE func_R();


/* CONSULTAS Y INCERCIONES */

/* INSERTAR EL ROL Y EL USUARIO PARA PODER LOGUEARSE CORRECTAMENTE */

INSERT INTO rol VALUES(DEFAULT,'ADMINISTRADOR');
INSERT INTO rol VALUES(DEFAULT,'REPARADOR');

INSERT INTO usuario VALUES(DEFAULT,'vUprTUCcPshg7o4excvfTyTIa1j2','papita@gmail.com',123456,1);
INSERT INTO usuario VALUES(DEFAULT,'vA2jJdEQicayznaiWJ0ouH2opGu2','seba-bonato@hotmail.com',123456,1);
INSERT INTO usuario VALUES(DEFAULT,'pds9O1LOaoaYhImGzxSqrXFGrTf2','sebabonato12@gmail.com',123456,1);

INSERT INTO cliente VALUES(DEFAULT,39261832,'Sebastian','Bonato','Herrera',3442507780,'sebabonato12@gmail.com');
INSERT INTO cliente VALUES(DEFAULT,39261833,'Alexis','Santos','CDU',3442507780,'sebabonato12@gmail.com');
INSERT INTO cliente VALUES(DEFAULT,39261834,'German','Bonzi','Tala',3442507780,'sebabonato12@gmail.com');
INSERT INTO cliente VALUES(DEFAULT,39261835,'Walter','Bel','CDU',3442507780,'sebabonato12@gmail.com');
INSERT INTO cliente VALUES(DEFAULT,39261836,'Matias','Nuñez','San Jose',3442507780,'sebabonato12@gmail.com');
INSERT INTO cliente VALUES(DEFAULT,39261837,'Joaquin','Garin','Colon',3442507780,'sebabonato12@gmail.com');
INSERT INTO cliente VALUES(DEFAULT,39261838,'Juan','Ponichan','San Jose',3442507780,'sebabonato12@gmail.com');
INSERT INTO cliente VALUES(DEFAULT,39261839,'Lucas','Areguati','San Jose',3442507780,'sebabonato12@gmail.com');
INSERT INTO cliente VALUES(DEFAULT,39261840,'Pablo','Papes','CDU',3442507780,'sebabonato12@gmail.com');
INSERT INTO cliente VALUES(DEFAULT,39261841,'Ivan','Pianeti','CDU',3442507780,'sebabonato12@gmail.com');
INSERT INTO cliente VALUES(DEFAULT,39261842,'Ernesto','Ledesma','CDU',3442507780,'sebabonato12@gmail.com');
INSERT INTO cliente VALUES(DEFAULT,39261843,'Mateo','Rogatky','CDU',3442507780,'sebabonato12@gmail.com');
INSERT INTO cliente VALUES(DEFAULT,39261844,'Marcial','Sartori','La Roque',3442507780,'sebabonato12@gmail.com');
INSERT INTO cliente VALUES(DEFAULT,39261845,'Matias','Koch','Colonia Elia',3442507780,'sebabonato12@gmail.com');

INSERT INTO producto VALUES(DEFAULT,'J7','Samsung','Pantalla de 5,5, Procesador Exynos 7870 de 8 Nucleos de 1,7GHz, 2GB de RAM LPDDR3,16GB de Memoria Interna 13 Mpx de cámara trasera, 5 Mpx de cámara frontal, Android 6.0.1 Conectividad 4G/LTE','Celular',5,11500);
INSERT INTO producto VALUES(DEFAULT,'Bateria J7','Samsung','Modelo: EB-BJ700BBC- Carga: 3000 mAh- Voltaje: 3.85 V','Repuesto',5,700);
INSERT INTO producto VALUES(DEFAULT,'Pantalla Display J7','Samsung','AMOLED/Touch Tamaño de la pantalla 5.5 pulgadas','Repuesto',2,3999);
INSERT INTO producto VALUES(DEFAULT,'Pin De Carga J7','Samsung','Pin de carga para modelos con 6mm entre patas','Repuesto',3,60);
INSERT INTO producto VALUES(DEFAULT,'J7','Samsung','Pantalla de 5,5, Procesador Exynos 7870 de 8 Nucleos de 1,7GHz, 2GB de RAM LPDDR3,16GB de Memoria Interna 13 Mpx de cámara trasera, 5 Mpx de cámara frontal, Android 6.0.1 Conectividad 4G/LTE','Celular',5,11500);
INSERT INTO producto VALUES(DEFAULT,'J7','Samsung','Pantalla de 5,5, Procesador Exynos 7870 de 8 Nucleos de 1,7GHz, 2GB de RAM LPDDR3,16GB de Memoria Interna 13 Mpx de cámara trasera, 5 Mpx de cámara frontal, Android 6.0.1 Conectividad 4G/LTE','Celular',5,11500);
INSERT INTO producto VALUES(DEFAULT,'J7','Samsung','Pantalla de 5,5, Procesador Exynos 7870 de 8 Nucleos de 1,7GHz, 2GB de RAM LPDDR3,16GB de Memoria Interna 13 Mpx de cámara trasera, 5 Mpx de cámara frontal, Android 6.0.1 Conectividad 4G/LTE','Celular',5,11500);


SELECT * FROM usuario;

select p.arreglo from presupuesto p where p.id_presupuesto=(select id_presupuesto from reparacion where id_reparacion=8)

SELECT PP.id_presupuestoproducto,PR.modelo,PP.cantidad,PP.precio FROM presupuestoProducto PP, producto PR WHERE PP.producto = PR.id_producto

SELECT * FROM presupuestoproducto;

SELECT id_reparacion,producto.id_producto, presupuesto.id_presupuesto, cliente.dni, to_char( fecha_ini, 'DD-MM-YYYY') as fecha_ini,to_char( fecha_fin, 'DD-MM-YYYY') as fecha_fin
FROM reparacion, arreglo, presupuesto,cliente,producto
where (arreglo.id_arreglo=presupuesto.arreglo)and(presupuesto.id_presupuesto=reparacion.id_presupuesto)
and(arreglo.cliente=cliente.id_cliente)and(arreglo.producto=producto.id_producto)

SELECT * FROM presupuesto

SELECT * FROM usuario;

SELECT * FROM venta_producto;

SELECT venta.id_venta FROM venta, venta_producto WHERE venta.id_venta = venta_producto.id_venta;


CREATE OR REPLACE FUNCTION func_control() RETURNS TRIGGER AS $funcemp$
DECLARE 
BEGIN 
	IF (SELECT venta.id_venta FROM venta, venta_producto WHERE new.id_venta = venta_producto.id_venta) THEN
		DELETE FROM venta WHERE venta.id_venta = new.id_venta;
	END IF;
RETURN NEW;
END; $funcemp$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_delete AFTER INSERT ON venta
FOR EACH ROW EXECUTE PROCEDURE func_control();

5 NOT IN (SELECT venta.id_venta FROM venta, venta_producto WHERE venta.id_venta = venta_producto.id_venta) THEN


select * from reparacion;