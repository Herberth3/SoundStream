from flask import Blueprint
from flask import request, jsonify
from controllers.artista_controller import insertarArtista, editarArtista, eliminarArtista, obtenerArtistaxNombre, obtenerArtistaxId, obtenerArtistas
from controllers.cancion_controlller import insertarCancion, editarCancion, eliminarCancion, obtenerCancionxNombre, obtenerCancionxId, obtenerCancionesArtista, obtenerCanciones
from controllers.album_controller import insertarAlbum, editarAlbum, eliminarAlbum, obtenerAlbumxNombre, obtenerAlbumxId, obtenerAlbumsArtista, obtenerAlbums
from controllers.cancion_album_controller import insertarCancionAlbum, eliminarCancionAlbum, obtenerCancionesAlbum

# El parametro 'content' (puede tener un nombre que represente a las url que le siguen) puede ser util para cuando se necesite un prefijo antes de las url
admin_blueprint = Blueprint('admin', __name__)

# ARTISTAS *
@admin_blueprint.route('/crearArtista', methods=['POST'])
async def crearArtista_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        artista = await insertarArtista(data)
        if 'error404' in artista:
            return jsonify(content=artista['error404']), 404 
        elif 'error' in artista:
            return jsonify(content=artista['error']), 500 # 500 Internal Server Error
        return jsonify(content=artista), 200 # 200 Created
    else:
        return jsonify(content='Datos de artista no válidos'), 400 # 400 Bad Request
    

@admin_blueprint.route('/editarArtista', methods=['POST'])
async def editarArtista_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        artista = await editarArtista(data)
        if 'error404' in artista:
            return jsonify(content=artista['error404']), 404 
        elif 'error' in artista:
            return jsonify(content=artista['error']), 500 # 500 Internal Server Error
        return jsonify(content=artista['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de artista no válidos'), 400 # 400 Bad Request
    
@admin_blueprint.route('/eliminarArtista', methods=['POST'])
async def eliminarArtista_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        artista = await eliminarArtista(data)
        if 'error404' in artista:
            return jsonify(content=artista['error404']), 404 
        elif 'error' in artista:
            return jsonify(content=artista['error']), 500 # 500 Internal Server Error
        return jsonify(content=artista['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de artista no válidos'), 400 # 400 Bad Request
    
@admin_blueprint.route('/artistaxNombre', methods=['POST'])
async def artistaxNombre_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        artista = await obtenerArtistaxNombre(data)
        if 'error404' in artista:
            return jsonify(content=artista['error404']), 404 
        elif 'error' in artista:
            return jsonify(content=artista['error']), 500 # 500 Internal Server Error
        return jsonify(content=artista['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de artista no válidos'), 400 # 400 Bad Request

@admin_blueprint.route('/artistaxId', methods=['POST'])
async def artistaxId_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        artista = await obtenerArtistaxId(data)
        if 'error404' in artista:
            return jsonify(content=artista['error404']), 404 
        elif 'error' in artista:
            return jsonify(content=artista['error']), 500 # 500 Internal Server Error
        return jsonify(content=artista['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de artista no válidos'), 400 # 400 Bad Request

@admin_blueprint.route('/listaArtistas', methods=['GET'])
async def listaArtistas_route():

    # Espera a que la función asíncrona termine
    artistas = await obtenerArtistas()
    if 'error' in artistas:
        return jsonify(content=artistas['error']), 500 # 500 Internal Server Error
    return jsonify(content=artistas['content']), 200 # 200 Created
    

# CANCIONES *
@admin_blueprint.route('/crearCancion', methods=['POST'])
async def crearCancion_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        cancion = await insertarCancion(data)
        if 'error404' in cancion:
            return jsonify(content=cancion['error404']), 404 
        elif 'error' in cancion:
            return jsonify(content=cancion['error']), 500 # 500 Internal Server Error
        return jsonify(content=cancion), 200 # 200 Created
    else:
        return jsonify(content='Datos de cancion no válidos'), 400 # 400 Bad Request
    

@admin_blueprint.route('/editarCancion', methods=['POST'])
async def editarCancion_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        cancion = await editarCancion(data)
        if 'error404' in cancion:
            return jsonify(content=cancion['error404']), 404 
        elif 'error' in cancion:
            return jsonify(content=cancion['error']), 500 # 500 Internal Server Error
        return jsonify(content=cancion['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de cancion no válidos'), 400 # 400 Bad Request
    
@admin_blueprint.route('/eliminarCancion', methods=['POST'])
async def eliminarCancion_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        cancion = await eliminarCancion(data)
        if 'error404' in cancion:
            return jsonify(content=cancion['error404']), 404 
        elif 'error' in cancion:
            return jsonify(content=cancion['error']), 500 # 500 Internal Server Error
        return jsonify(content=cancion['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de cancion no válidos'), 400 # 400 Bad Request
    
@admin_blueprint.route('/cancionxNombre', methods=['POST'])
async def cancionxNombre_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        cancion = await obtenerCancionxNombre(data)
        if 'error404' in cancion:
            return jsonify(content=cancion['error404']), 404 
        elif 'error' in cancion:
            return jsonify(content=cancion['error']), 500 # 500 Internal Server Error
        return jsonify(content=cancion['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de cancion no válidos'), 400 # 400 Bad Request

@admin_blueprint.route('/cancionxID', methods=['POST'])
async def cancionxID_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        cancion = await obtenerCancionxId(data)
        if 'error404' in cancion:
            return jsonify(content=cancion['error404']), 404 
        elif 'error' in cancion:
            return jsonify(content=cancion['error']), 500 # 500 Internal Server Error
        return jsonify(content=cancion['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de cancion no válidos'), 400 # 400 Bad Request
    
@admin_blueprint.route('/cancionesArtista', methods=['POST'])
async def cancionesArtista_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        cancion = await obtenerCancionesArtista(data)
        if 'error404' in cancion:
            return jsonify(content=cancion['error404']), 404 
        elif 'error' in cancion:
            return jsonify(content=cancion['error']), 500 # 500 Internal Server Error
        return jsonify(content=cancion['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de cancion no válidos'), 400 # 400 Bad Request

@admin_blueprint.route('/listaCanciones', methods=['GET'])
async def listaCanciones_route():
    
    # Espera a que la función asíncrona termine
    cancion = await obtenerCanciones()
    if 'error' in cancion:
        return jsonify(content=cancion['error']), 500 # 500 Internal Server Error
    return jsonify(content=cancion['content']), 200 # 200 Created

    
# ALBUM *
@admin_blueprint.route('/crearAlbum', methods=['POST'])
async def crearAlbum_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        album = await insertarAlbum(data)
        if 'error404' in album:
            return jsonify(content=album['error404']), 404 
        elif 'error' in album:
            return jsonify(content=album['error']), 500 # 500 Internal Server Error
        return jsonify(content=album), 200 # 200 Created
    else:
        return jsonify(content='Datos de album no válidos'), 400 # 400 Bad Request
    

@admin_blueprint.route('/editarAlbum', methods=['POST'])
async def editarAlbum_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        album = await editarAlbum(data)
        if 'error404' in album:
            return jsonify(content=album['error404']), 404 
        elif 'error' in album:
            return jsonify(content=album['error']), 500 # 500 Internal Server Error
        return jsonify(content=album['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de album no válidos'), 400 # 400 Bad Request
    
@admin_blueprint.route('/eliminarAlbum', methods=['POST'])
async def eliminarAlbum_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        album = await eliminarAlbum(data)
        if 'error404' in album:
            return jsonify(content=album['error404']), 404 
        elif 'error' in album:
            return jsonify(content=album['error']), 500 # 500 Internal Server Error
        return jsonify(content=album['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de album no válidos'), 400 # 400 Bad Request
    
@admin_blueprint.route('/albumxNombre', methods=['POST'])
async def albumxNombre_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        album = await obtenerAlbumxNombre(data)
        if 'error404' in album:
            return jsonify(content=album['error404']), 404 
        elif 'error' in album:
            return jsonify(content=album['error']), 500 # 500 Internal Server Error
        return jsonify(content=album['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de album no válidos'), 400 # 400 Bad Request

@admin_blueprint.route('/albumxId', methods=['POST'])
async def albumxId_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        album = await obtenerAlbumxId(data)
        if 'error404' in album:
            return jsonify(content=album['error404']), 404 
        elif 'error' in album:
            return jsonify(content=album['error']), 500 # 500 Internal Server Error
        return jsonify(content=album['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de album no válidos'), 400 # 400 Bad Request
    
@admin_blueprint.route('/albumsArtista', methods=['POST'])
async def albumsArtista_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        album = await obtenerAlbumsArtista(data)
        if 'error404' in album:
            return jsonify(content=album['error404']), 404 
        elif 'error' in album:
            return jsonify(content=album['error']), 500 # 500 Internal Server Error
        return jsonify(content=album['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de album no válidos'), 400 # 400 Bad Request

@admin_blueprint.route('/listaAlbum', methods=['GET'])
async def listaAlbum_route():

    # Espera a que la función asíncrona termine
    album = await obtenerAlbums()
    if 'error' in album:
        return jsonify(content=album['error']), 500 # 500 Internal Server Error
    return jsonify(content=album['content']), 200 # 200 Created
    

# CANCIONES-ALBUM *
@admin_blueprint.route('/agregarCancionAlbum', methods=['POST'])
async def agregarCancionAlbum_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        cancion = await insertarCancionAlbum(data)
        if 'error404' in cancion:
            return jsonify(content=cancion['error404']), 404 
        elif 'error' in cancion:
            return jsonify(content=cancion['error']), 500 # 500 Internal Server Error
        return jsonify(content=cancion['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de cancion no válidos'), 400 # 400 Bad Request
    
@admin_blueprint.route('/eliminarCancionAlbum', methods=['POST'])
async def eliminarCancionAlbum_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        cancion = await eliminarCancionAlbum(data)
        if 'error404' in cancion:
            return jsonify(content=cancion['error404']), 404 
        elif 'error' in cancion:
            return jsonify(content=cancion['error']), 500 # 500 Internal Server Error
        return jsonify(content=cancion['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de cancion no válidos'), 400 # 400 Bad Request
    
@admin_blueprint.route('/cancionesAlbum', methods=['POST'])
async def cancionesAlbum_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        canciones = await obtenerCancionesAlbum(data)
        if 'error404' in canciones:
            return jsonify(content=canciones['error404']), 404 
        elif 'error' in canciones:
            return jsonify(content=canciones['error']), 500 # 500 Internal Server Error
        return jsonify(content=canciones['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de album no válidos'), 400 # 400 Bad Request