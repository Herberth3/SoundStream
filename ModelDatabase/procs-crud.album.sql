USE soundstreamdb;

DELIMITER $$
CREATE PROCEDURE insertarAlbum(
  IN p_id_artista INT,
  IN p_nombre TEXT,
  IN p_descripcion TEXT,
  IN p_foto TEXT
)
BEGIN
    IF NOT EXISTS (
        SELECT * FROM Album
        WHERE id_artista = p_id_artista AND nombre = p_nombre
    ) THEN
        INSERT INTO Album (id_artista, nombre, descripcion, foto)
        VALUES (p_id_artista, p_nombre, p_descripcion, p_foto);
        SELECT id_album AS respuesta FROM Album WHERE id_artista = p_id_artista AND nombre = p_nombre;
    ELSE
        SELECT 0 AS respuesta;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE eliminarAlbum(
    IN p_id_album  INT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Album WHERE id_album = p_id_album) THEN
        SELECT 0 AS respuesta;
    ELSE
        DELETE FROM Album WHERE id_album = p_id_album;
        SELECT 1 AS respuesta;
  END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE editarAlbum(
    IN p_id_artista INT,
    IN p_id_album INT,
    IN p_nombre TEXT,
    IN p_descripcion TEXT
)
BEGIN
    IF NOT EXISTS (
        SELECT * FROM Album 
        WHERE id_artista = p_id_artista AND nombre = p_nombre
    ) THEN
        UPDATE Album
        SET nombre = p_nombre, 
        descripcion = p_descripcion
        WHERE id_album = p_id_album;
        SELECT 1 AS respuesta;
    ELSE
        SELECT 0 AS respuesta;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE editarFotoAlbum(
    IN p_id_album INT,
    IN p_foto TEXT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Album WHERE id_album = p_id_album) THEN
        SELECT 0 AS respuesta;
    ELSE
    UPDATE Album
        SET foto = p_foto
        WHERE id_album = p_id_album;
        SELECT 1 AS respuesta;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE obtenerAlbumxId (
    IN p_id_album INT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Album WHERE id_album = p_id_album) THEN
        SELECT 0 AS respuesta;
    ELSE
        SELECT * FROM Album WHERE id_album = p_id_album;
    END IF;
END$$
DELIMITER ;

CREATE PROCEDURE obtenerAlbumxNombre(
    IN p_nombre INT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Album WHERE nombre = p_nombre) THEN
        SELECT 0 AS respuesta;
    ELSE
        SELECT * FROM Album WHERE nombre = p_nombre;
    END IF;
END

DELIMITER $$
CREATE PROCEDURE obtenerAlbumsArtista (
    IN c_id_artista INT
)
BEGIN
    IF NOT EXISTS (SELECT * FROM Album WHERE id_artista = c_id_artista) THEN
        SELECT 0 AS respuesta;
    ELSE
        SELECT id_album, nombre, descripcion, foto FROM Album WHERE id_artista = c_id_artista;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE obtenerAlbums ()
BEGIN
    SELECT * FROM Album;
END$$
DELIMITER ;
