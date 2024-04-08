USE soundstreamdb;

DELIMITER $$
CREATE PROCEDURE insertarCancionAlbum(
  IN p_id_cancion INT,
  IN p_id_album INT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Cancion_Album WHERE id_cancion = p_id_cancion) THEN
        INSERT INTO Cancion_Album (id_cancion, id_album) 
        VALUES (p_id_cancion, p_id_album);
        SELECT 1 AS respuesta;
    ELSE
        SELECT 0 AS respuesta;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE eliminarCancionAlbum(
  IN p_id_cancion INT,
  IN p_id_album INT
)
BEGIN
    IF NOT EXISTS (
        SELECT * FROM Cancion_Album 
        WHERE id_cancion = p_id_cancion AND id_album = p_id_album
    ) THEN
        SELECT 0 AS respuesta;
    ELSE
        DELETE FROM Cancion_Album 
        WHERE id_cancion = p_id_cancion AND id_album = p_id_album;
        SELECT 1 AS respuesta;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE obtenerCancionesAlbum (
    IN p_id_album INT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Cancion_Album WHERE id_album = p_id_album) THEN
        SELECT 0 AS respuesta;
    ELSE
        SELECT id_cancion FROM Cancion_Album WHERE id_album = p_id_album;
    END IF
END$$
DELIMITER ;