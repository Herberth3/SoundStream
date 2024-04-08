USE soundstreamdb;

DELIMITER $$  
CREATE PROCEDURE insertarUsuario(
  IN p_nombres TEXT,
  IN p_apellidos TEXT,
  IN p_correo TEXT,
  IN p_contra TEXT,
  IN p_fecha_nac TEXT,
  IN p_foto TEXT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Usuario u WHERE u.correo = p_correo) THEN
        INSERT INTO Usuario (nombres, apellidos, correo, contra, fecha_nac, foto)
        VALUES (p_nombres, p_apellidos, p_correo, p_contra, p_fecha_nac, p_foto);
        SELECT id_usuario AS respuesta FROM Usuario WHERE correo = p_correo;
    ELSE
        SELECT 0 AS respuesta;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE eliminarUsuario(
  in p_correo TEXT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Usuario u WHERE u.correo = p_correo) THEN
        SELECT 0 AS respuesta;
    ELSE
        DELETE FROM Usuario
        WHERE correo = p_correo;
        SELECT 1 AS respuesta;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE editarUsuario(
  IN p_nombres TEXT,
  IN p_apellidos TEXT,
  in p_correo TEXT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Usuario u WHERE u.correo = p_correo) THEN
        SELECT 0 AS respuesta;
    ELSE
        UPDATE Usuario
        SET nombres = p_nombres,
        apellidos = p_apellidos
        WHERE correo = p_correo;
        SELECT 1 AS respuesta;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE editarFotoUsuario(
  in p_correo TEXT,
  IN p_foto TEXT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Usuario u WHERE u.correo = p_correo) THEN
        SELECT 0 AS respuesta;
    ELSE
        UPDATE Usuario
        SET foto = p_foto
        WHERE correo = p_correo;
        SELECT 1 AS respuesta;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE editarContraUsuario(
  in p_correo TEXT,
  IN p_contra TEXT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Usuario u WHERE u.correo = p_correo) THEN
        SELECT 0 AS respuesta;
    ELSE
        UPDATE Usuario
        SET contra = p_contra
        WHERE correo = p_correo;
        SELECT 1 AS respuesta;
    END IF;
END$$
DELIMITER ;


DELIMITER $$
CREATE PROCEDURE obtenerUsuario(
  in p_correo TEXT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Usuario u WHERE u.correo = p_correo) THEN
        SELECT 0 AS respuesta;
    ELSE
        SELECT * FROM Usuario WHERE correo = p_correo;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE obtenerUsuarios()
BEGIN
    SELECT * FROM Usuario;
END$$
DELIMITER ;
