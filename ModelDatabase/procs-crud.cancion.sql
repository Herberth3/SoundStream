USE soundstreamdb;

DELIMITER $$
CREATE PROCEDURE insertarCancion(
  IN c_id_artista INT,
  IN c_nombre TEXT,
  IN c_foto TEXT,
  IN c_duracion TEXT,
  IN c_mp3 TEXT
)
BEGIN
    IF NOT EXISTS (
        SELECT * FROM Cancion
        WHERE id_artista = c_id_artista AND nombre = c_nombre
    ) THEN
        INSERT INTO Cancion (id_artista, nombre, foto, duracion, mp3)
        VALUES (c_id_artista, c_nombre, c_foto, c_duracion, c_mp3);
        SELECT id_cancion AS respuesta FROM Cancion WHERE id_artista = c_id_artista AND nombre = c_nombre;
    ELSE
        SELECT 0 AS respuesta;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE eliminarCancion(
    IN c_id_cancion INT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Cancion WHERE id_cancion = c_id_cancion) THEN
        SELECT 0 AS respuesta;
    ELSE
        DELETE FROM Cancion WHERE id_cancion = c_id_cancion;
        SELECT 1 AS respuesta;
  END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE editarCancion(
    IN c_id_artista INT,
    IN c_id_cancion INT,
    IN c_nombre TEXT
)
BEGIN
    IF NOT EXISTS (
        SELECT * FROM Cancion 
        WHERE id_artista = c_id_artista AND nombre = c_nombre
    ) THEN
        UPDATE Cancion
        SET nombre = c_nombre   
        WHERE id_cancion = c_id_cancion;
        SELECT 1 AS respuesta;
    ELSE
        SELECT 0 AS respuesta;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE editarFotoCancion(
    IN c_id_cancion INT,
    IN c_foto TEXT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Cancion WHERE id_cancion = c_id_cancion) THEN
        SELECT 0 AS respuesta;
    ELSE
        UPDATE Cancion
        SET foto = c_foto
        WHERE id_cancion = c_id_cancion;
        SELECT 1 AS respuesta;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE editarMp3Cancion(
    IN c_id_cancion INT,
    IN c_duracion TEXT,
    IN c_mp3 TEXT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Cancion WHERE id_cancion = c_id_cancion) THEN
        SELECT 0 AS respuesta;
    ELSE
        UPDATE Cancion
        SET duracion = c_duracion,
        mp3 = c_mp3
        WHERE id_cancion = c_id_cancion;
        SELECT 1 AS respuesta;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE obtenerCancionxId (
    IN c_id_cancion INT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Cancion WHERE id_cancion = c_id_cancion) THEN
        SELECT 0 AS respuesta;
    ELSE
        SELECT * FROM Cancion WHERE id_cancion = c_id_cancion;
    END IF;
END$$
DELIMITER ;

CREATE PROCEDURE obtenerCancionxNombre(
    IN c_nombre  INT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Cancion WHERE nombre = c_nombre) THEN
        SELECT 0 AS respuesta;
    ELSE
        SELECT * FROM Cancion WHERE nombre = c_nombre;
    END IF;
END

DELIMITER $$
CREATE PROCEDURE obtenerCancionesArtista (
    IN c_id_artista INT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Cancion WHERE id_artista = c_id_artista) THEN
        SELECT 0 AS respuesta;
    ELSE
        SELECT id_cancion, nombre, foto, duracion, mp3 FROM Cancion WHERE id_artista = c_id_artista;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE obtenerCanciones ()
BEGIN
    SELECT * FROM Cancion;
END$$
DELIMITER ;
