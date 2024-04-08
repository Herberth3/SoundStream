USE soundstreamdb;

DELIMITER $$  
CREATE PROCEDURE insertarPlaylist(
    IN p_id_usuario INT,
    IN p_nombre TEXT,
    IN p_descripcion TEXT,
    IN p_foto TEXT
)
BEGIN
    INSERT INTO Playlist (id_usuario, nombre, descripcion, foto)
    VALUES (p_id_usuario, p_nombre, p_descripcion, p_foto);
    SELECT LAST_INSERT_ID() AS respuesta;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE eliminarPlaylist(
    IN p_id_playlist INT
)
BEGIN
    IF NOT EXISTS (SELECT id_playlist FROM Playlist WHERE id_playlist = p_id_playlist) THEN
        SELECT 0 AS respuesta;
    ELSE
        DELETE FROM Playlist WHERE id_playlist = p_id_playlist;
        SELECT 1 AS respuesta;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE editarPlaylist(
    IN p_id_playlist INT,
    IN p_nombre TEXT,
    IN p_descripcion TEXT
)
BEGIN
    IF NOT EXISTS (SELECT id_playlist FROM Playlist WHERE id_playlist = p_id_playlist) THEN
        SELECT 0 AS respuesta;
    ELSE
        UPDATE Playlist
        SET nombre = p_nombre,
        descripcion = p_descripcion
        WHERE id_playlist = p_id_playlist;
        SELECT 1 AS respuesta;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE editarFotoPlaylist(
    IN p_id_playlist INT,
    IN p_foto TEXT
)
BEGIN
    IF NOT EXISTS (SELECT id_playlist FROM Playlist WHERE id_playlist = p_id_playlist) THEN
        SELECT 0 AS respuesta;
    ELSE
        UPDATE Playlist
        SET foto = p_foto
        WHERE id_playlist = p_id_playlist;
        SELECT 1 AS respuesta;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE obtenerPlaylistxId (
    IN p_id_playlist INT
)
BEGIN
    IF NOT EXISTS (SELECT id_playlist FROM Playlist WHERE id_playlist = p_id_playlist) THEN
        SELECT 0 AS respuesta;
    ELSE
        SELECT * FROM Playlist WHERE id_playlist = p_id_playlist;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE obtenerPlaylistsUsario (
    IN p_id_usuario INT
)
BEGIN
    IF NOT EXISTS (SELECT id_playlist FROM Playlist WHERE id_usuario = p_id_usuario) THEN
        SELECT 0 AS respuesta;
    ELSE
        SELECT id_playlist, nombre, descripcion, foto FROM Playlist WHERE id_usuario = p_id_usuario;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE obtenerPlaylists ()
BEGIN
    SELECT * FROM Playlist;
END$$
DELIMITER ;

