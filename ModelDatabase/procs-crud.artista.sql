USE soundstreamdb;

DELIMITER $$
CREATE PROCEDURE insertarArtista(
  IN a_nombre TEXT,
  IN a_foto TEXT,
  IN a_fecha_nac TEXT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Artista WHERE nombre = a_nombre) THEN
        INSERT INTO Artista (nombre, foto, fecha_nac)
        VALUES (a_nombre, a_foto, a_fecha_nac);
        SELECT id_artista AS respuesta FROM Artista WHERE nombre = a_nombre;
    ELSE
        SELECT 0 AS respuesta;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE eliminarArtista(
  IN a_id_artista INT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Artista WHERE id_artista = a_id_artista) THEN
        SELECT 0 AS respuesta;
    ELSE
        DELETE FROM Artista WHERE id_artista = a_id_artista;
        SELECT 1 AS respuesta;
     END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE editarArtista(
  IN a_id_artista INT,
  IN nuevo_nombre TEXT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Artista WHERE nombre = nuevo_nombre) THEN
        UPDATE Artista
        SET nombre = nuevo_nombre
        WHERE id_artista = a_id_artista;
        SELECT 1 AS respuesta;
    ELSE 
        SELECT 0 AS respuesta;
        
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE editarFotoArtista(
  IN a_id_artista INT,
  IN nueva_foto TEXT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Artista WHERE id_artista = a_id_artista) THEN
        SELECT 0 AS respuesta;
    ELSE
        UPDATE Artista
        SET foto = nueva_foto
        WHERE id_artista = a_id_artista;
        SELECT 1 AS respuesta;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE obtenerArtistaxNombre(
  IN a_nombre TEXT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Artista WHERE nombre = a_nombre) THEN
        SELECT 0 AS respuesta;
    ELSE
        SELECT * FROM Artista WHERE nombre = a_nombre;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE obtenerArtistaxId(
  IN a_id_artista INT,
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Artista WHERE id_artista = a_id_artista;) THEN
        SELECT 0 AS respuesta;
    ELSE
        SELECT * FROM Artista WHERE id_artista = a_id_artista;;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE obtenerArtistas()
BEGIN
    SELECT * FROM Artista;
END$$
DELIMITER ;