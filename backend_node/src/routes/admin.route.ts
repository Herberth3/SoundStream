import { Router } from 'express'
import { insertarArtista, editarArtista, eliminarArtista, obtenerArtistaxNombre, obtenerArtistaxId, healthy, obtenerArtistas } from '../controllers/artista.controller'
import { insertarCancion, editarCancion, eliminarCancion, obtenerCancionxId, obtenerCancionxNombre, obtenerCancionesArtista, obtenerCanciones } from '../controllers/cancion.controllers';
import { insertarAlbum, editarAlbum, eliminarAlbum, obtenerAlbumxNombre, obtenerAlbumxId, obtenerAlbumsArtista, obtenerAlbums } from '../controllers/album.controller';
import { eliminarCancionAlbum, insertarCancionAlbum, obtenerCancionesAlbum } from '../controllers/cancion_album.controller';

const router = Router();

router.post('/crearArtista', insertarArtista);
router.post('/editarArtista', editarArtista);
router.post('/eliminarArtista', eliminarArtista);
router.post('/artistaxNombre', obtenerArtistaxNombre);
router.post('/artistaxId', obtenerArtistaxId);
router.get('/listaArtistas', obtenerArtistas);

router.post('/crearCancion', insertarCancion);
router.post('/editarCancion', editarCancion); 
router.post('/eliminarCancion', eliminarCancion);
router.post('/cancionxNombre', obtenerCancionxNombre);
router.post('/cancionxId', obtenerCancionxId);
router.post('/cancionesArtista', obtenerCancionesArtista);
router.get('/listaCanciones', obtenerCanciones);
       
router.post('/crearAlbum', insertarAlbum);
router.post('/editarAlbum', editarAlbum);
router.post('/eliminarAlbum', eliminarAlbum);
router.post('/albumxNombre', obtenerAlbumxNombre);
router.post('/albumxId', obtenerAlbumxId);
router.post('/albumsArtista', obtenerAlbumsArtista);
router.get('/listaAlbum', obtenerAlbums);

router.post('/agregarCancionAlbum', insertarCancionAlbum);
router.post('/eliminarCancionAlbum', eliminarCancionAlbum);
router.post('/cancionesAlbum', obtenerCancionesAlbum);

router.get('/ping', healthy);

export default router;
