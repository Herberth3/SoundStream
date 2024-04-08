CREATE DATABASE IF NOT EXISTS soundstreamdb;
USE soundstreamdb;

CREATE TABLE IF NOT EXISTS Usuario (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  nombres TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  correo TEXT NOT NULL,
  contra TEXT NOT NULL,
  fecha_nac TEXT NULL,
  foto TEXT NOT NULL,
  PRIMARY KEY (id_usuario)
);

CREATE TABLE IF NOT EXISTS Artista (
  id_artista INT NOT NULL AUTO_INCREMENT,
  nombre TEXT NOT NULL,
  foto TEXT NOT NULL,
  fecha_nac TEXT NOT NULL,
  PRIMARY KEY (id_artista)
);

CREATE TABLE IF NOT EXISTS Album (
  id_album INT NOT NULL AUTO_INCREMENT,
  id_artista INT NOT NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT NULL,
  foto TEXT NOT NULL,
  FOREIGN KEY (id_artista) REFERENCES Artista (id_artista),
  PRIMARY KEY (id_album)
);

CREATE TABLE IF NOT EXISTS Cancion (
  id_cancion INT NOT NULL AUTO_INCREMENT,
  id_artista INT NOT NULL,
  nombre TEXT NOT NULL,
  foto TEXT NOT NULL,
  duracion TEXT NOT NULL,
  mp3 TEXT NOT NULL,
  FOREIGN KEY (id_artista) REFERENCES Artista (id_artista),
  PRIMARY KEY (id_cancion)
);

CREATE TABLE IF NOT EXISTS Cancion_Album (
  id_cancion INT NOT NULL,
  id_album INT NOT NULL,
  FOREIGN KEY (id_cancion) REFERENCES Cancion (id_cancion),
  FOREIGN KEY (id_album) REFERENCES Album (id_album),
  PRIMARY KEY (id_cancion)
);

CREATE TABLE IF NOT EXISTS Playlist (
  id_playlist INT NOT NULL AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT NULL,
  foto TEXT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario),
  PRIMARY KEY (id_playlist)
);

CREATE TABLE IF NOT EXISTS Playlist_Cancion(
  id_cancion INT NOT NULL,
  id_playlist INT NOT NULL,
  FOREIGN KEY (id_cancion) REFERENCES Cancion (id_cancion),
  FOREIGN KEY (id_playlist) REFERENCES Playlist (id_playlist)
);

CREATE TABLE IF NOT EXISTS Logs (
  id_usuario INT NOT NULL,
  id_cancion INT NOT NULL,
  veces_rep INT,
  descripcion TEXT, 
  FOREIGN KEY (id_usuario) REFERENCES Usuario (id_usuario),
  FOREIGN KEY (id_cancion) REFERENCES Cancion (id_cancion)
);
