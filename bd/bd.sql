CREATE TABLE `tbl_agenda` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apaterno` varchar(100) NOT NULL,
  `amaterno` varchar(100) NOT NULL,
  `genero` varchar(10) DEFAULT NULL,
  `fecha_nacimiento` DATE,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `linkedin` varchar(100) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `tbl_agenda` (`id`, `nombre`, `apaterno`, `amaterno`, `genero`, `fecha_nacimiento`, `telefono`, `email`, `linkedin`, `avatar`)
VALUES
	(1,'Any','Sanchez','Vargas','Femenino','1974-10-14','984034577','any74@gmail.com','linkedin.com/in/anysanchez','b70032d832.png'),
	(2,'Urian','Fernandez','Cruz','Masculino','1976-08-05','984000112','Ufer@gmail.com','linkedin.com/in/urianfernandez','daea327347.jpg'),
	(3,'Abelado','Bolivar','Griffin','Masculino','1998-11-22','940278088','Gri@gmail.com','linkedin.com/in/abeladobolivar','b70032d832.png'),
	(4,'Camilo','Rodriguez','Paredes','Masculino','2003-02-26','990305024','tulovaqu123@gmail.com','linkedin.com/in/camilorodriguez','daea327347.jpg');