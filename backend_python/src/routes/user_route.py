from flask import Blueprint
from flask import request, jsonify
from controllers.user_controller import editarUsuario, obtenerUsuario
from controllers.playlist_controller import insertarPlaylist, editarPlaylist, eliminarPlaylist, obtenerPlaylistxId, obtenerPlaylistsUsario, obtenerPlaylists
from controllers.cancion_playlist_controller import insertarCancionPlaylist, eliminarCancionPlaylist, obtenerCancionesPlaylist

# El parametro 'content' (puede tener un nombre que represente a las url que le siguen) puede ser util para cuando se necesite un prefijo antes de las url
user_blueprint = Blueprint('user', __name__)

# USUARIOS *
@user_blueprint.route('/editarUsuario', methods=['POST'])
async def editarUsuario_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        usuario = await editarUsuario(data)
        if 'error404' in usuario:
            return jsonify(content=usuario['error404']), 404 
        elif 'error' in usuario:
            return jsonify(content=usuario['error']), 500 # 500 Internal Server Error
        return jsonify(content=usuario['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de usuario no válidos'), 400 # 400 Bad Request

@user_blueprint.route('/usuario', methods=['POST'])
async def usuario_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        usuario = await obtenerUsuario(data)
        if 'error404' in usuario:
            return jsonify(content=usuario['error404']), 404 
        elif 'error' in usuario:
            return jsonify(content=usuario['error']), 500 # 500 Internal Server Error
        return jsonify(content=usuario['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de usuario no válidos'), 400 # 400 Bad Request
    
# PLAYLISTS
@user_blueprint.route('/crearPlaylist', methods=['POST'])
async def crearPlaylist_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        playlist = await insertarPlaylist(data)
        if 'error' in playlist:
            return jsonify(content=playlist['error']), 500 # 500 Internal Server Error
        return jsonify(content=playlist), 200 # 200 Created
    else:
        return jsonify(content='Datos de playlist no válidos'), 400 # 400 Bad Request

@user_blueprint.route('/editarPlaylist', methods=['POST'])
async def editarPlaylist_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        playlist = await editarPlaylist(data)
        if 'error404' in playlist:
            return jsonify(content=playlist['error404']), 404 
        elif 'error' in playlist:
            return jsonify(content=playlist['error']), 500 # 500 Internal Server Error
        return jsonify(content=playlist['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de playlist no válidos'), 400 # 400 Bad Request
    
@user_blueprint.route('/eliminarPlaylist', methods=['POST'])
async def eliminarPlaylist_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        playlist = await eliminarPlaylist(data)
        if 'error404' in playlist:
            return jsonify(content=playlist['error404']), 404 
        elif 'error' in playlist:
            return jsonify(content=playlist['error']), 500 # 500 Internal Server Error
        return jsonify(content=playlist['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de playlist no válidos'), 400 # 400 Bad Request
    
@user_blueprint.route('/playlistxId', methods=['POST'])
async def playlistxId_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        playlist = await obtenerPlaylistxId(data)
        if 'error404' in playlist:
            return jsonify(content=playlist['error404']), 404 
        elif 'error' in playlist:
            return jsonify(content=playlist['error']), 500 # 500 Internal Server Error
        return jsonify(content=playlist['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de playlist no válidos'), 400 # 400 Bad Request
    
@user_blueprint.route('/playlistsUsario', methods=['POST'])
async def playlistsUsario_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        playlist = await obtenerPlaylistsUsario(data)
        if 'error404' in playlist:
            return jsonify(content=playlist['error404']), 404 
        elif 'error' in playlist:
            return jsonify(content=playlist['error']), 500 # 500 Internal Server Error
        return jsonify(content=playlist['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de playlist no válidos'), 400 # 400 Bad Request
    
@user_blueprint.route('/listaPlaylists', methods=['GET'])
async def listaPlaylists_route():

    # Espera a que la función asíncrona termine
    playlist = await obtenerPlaylists()
    if 'error' in playlist:
        return jsonify(content=playlist['error']), 500 # 500 Internal Server Error
    return jsonify(content=playlist['content']), 200 # 200 Created

    
# PLAYLIST-CANCIONES *
@user_blueprint.route('/agregarCancionPlaylist', methods=['POST'])
async def agregarCancionPlaylist_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        cancion = await insertarCancionPlaylist(data)
        if 'error404' in cancion:
            return jsonify(content=cancion['error404']), 404 
        elif 'error' in cancion:
            return jsonify(content=cancion['error']), 500 # 500 Internal Server Error
        return jsonify(content=cancion['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de playlist no válidos'), 400 # 400 Bad Request
    
@user_blueprint.route('/eliminarCancionPlaylist', methods=['POST'])
async def eliminarCancionPlaylist_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        cancion = await eliminarCancionPlaylist(data)
        if 'error404' in cancion:
            return jsonify(content=cancion['error404']), 404 
        elif 'error' in cancion:
            return jsonify(content=cancion['error']), 500 # 500 Internal Server Error
        return jsonify(content=cancion['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de playlist no válidos'), 400 # 400 Bad Request
    
@user_blueprint.route('/cancionesPlaylist', methods=['POST'])
async def cancionesPlaylist_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        cancion = await obtenerCancionesPlaylist(data)
        if 'error404' in cancion:
            return jsonify(content=cancion['error404']), 404 
        elif 'error' in cancion:
            return jsonify(content=cancion['error']), 500 # 500 Internal Server Error
        return jsonify(content=cancion['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de playlist no válidos'), 400 # 400 Bad Request
    

#PING PYTHON 
@user_blueprint.route('/', methods=['GET'])
async def ping_route():# 500 Internal Server Error
    return jsonify(content='SERVIDOR PYTHON HACIENDO PING'), 200 # 200 Created