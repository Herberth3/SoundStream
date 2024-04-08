USE soundstreamdb;

DELIMITER $$
CREATE PROCEDURE insertarCancionPlaylist(
  IN p_id_cancion INT,
  IN p_id_playlist INT
)
BEGIN
  IF NOT EXISTS (
    SELECT * FROM Playlist_Cancion 
    WHERE id_cancion = p_id_cancion AND id_playlist = p_id_playlist
  ) THEN 
    INSERT INTO Playlist_Cancion (id_cancion, id_playlist)
    VALUES (p_id_cancion, p_id_playlist);
    SELECT 1 AS respuesta;
  ELSE 
    SELECT 0 AS respuesta;
  END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE eliminarCancionPlaylist(
  IN p_id_cancion INT,
  IN p_id_playlist INT
)
BEGIN
  IF NOT EXISTS (
    SELECT * FROM Playlist_Cancion 
    WHERE id_cancion = p_id_cancion AND id_playlist = p_id_playlist
  ) THEN
    SELECT 0 AS respuesta;
  ELSE
    DELETE FROM Playlist_Cancion
    WHERE id_cancion = p_id_cancion AND id_playlist = p_id_playlist;
    SELECT 1 AS respuesta;
  END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE obtenerCancionesPlaylist (
    IN p_id_playlist INT
)
BEGIN
  IF NOT EXISTS (SELECT * FROM Playlist_Cancion WHERE id_playlist = p_id_playlist) THEN
    SELECT 0 AS respuesta;
  ELSE
    SELECT id_cancion FROM Playlist_Cancion WHERE id_playlist = p_id_playlist;
  END IF;
END$$
DELIMITER ;