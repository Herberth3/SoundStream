import { Router } from 'express'
import {editarUsuario, obtenerUsuario, healthy } from '../controllers/user.controller'
import { editarPlaylist, eliminarPlaylist, insertarPlaylist, obtenerPlaylists, obtenerPlaylistsUsario, obtenerPlaylistxId } from '../controllers/playlist.controller';
import { eliminarCancionPlaylist, insertarCancionPlaylist, obtenerCancionesPlaylist } from '../controllers/cancion_playlist.controller';

const router = Router();

router.post('/editarUsuario', editarUsuario);
router.post('/usuario', obtenerUsuario);

router.post('/crearPlaylist', insertarPlaylist);
router.post('/editarPlaylist', editarPlaylist);
router.post('/eliminarPlaylist', eliminarPlaylist);
router.post('/playlistxId', obtenerPlaylistxId);
router.post('/playlistsUsario', obtenerPlaylistsUsario);
router.get('/listaPlaylists', obtenerPlaylists);

router.post('/agregarCancionPlaylist', insertarCancionPlaylist);
router.post('/eliminarCancionPlaylist', eliminarCancionPlaylist);
router.post('/cancionesPlaylist', obtenerCancionesPlaylist);

router.get('/ping', healthy);

export default router;
