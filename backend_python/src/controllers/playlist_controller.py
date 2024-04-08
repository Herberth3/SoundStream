from decouple import config
from configs.mysql_config import execute_procedure
from configs.s3_config import uploadS3Base64

async def insertarPlaylist(data):
    try:
        urlFoto = '-'

        insert_result = await execute_procedure('insertarPlaylist', [data['id_usuario'], data['nombre'], data['descrip'], urlFoto])
        
        if data['nombreFoto'] != '' and data['foto'] != '':
            # url_image: sintaxis por conveniencia para el nombre de la imagen
            url_image = f'fotos/{data["nombreFoto"]}'
            # Carga la imagen en S3 y obtiene la URL
            urlFoto = await uploadS3Base64(data['foto'], url_image, config('aws_bucket_name'), 'image')
            id_Playlist = insert_result['respuesta']
            # Edito la cancion en la base de datos
            await execute_procedure('editarFotoPlaylist', [id_Playlist, urlFoto])

        new_playlist = {
            'id_Playlist' : insert_result['respuesta'],
            'id_usuario' : data['id_usuario'],
            'nombre': data['nombre'],
            'foto': urlFoto,
            'descrip': data['descrip']
        }
        return new_playlist

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}
    
async def editarPlaylist(data):
    try:
        update_result = await execute_procedure('editarPlaylist', [data['id_playlist'], data['nombre'], data['descrip']])
        if update_result.get('respuesta') == 0:
            return {'error404': 'No existe un playlist registrado con el ID: ' + data['id_playlist'] +', porfavor registrate previamente'}

        # Subo la imagen al bucket si se desea
        if data['nombreFoto'] != '' and data['foto'] != '':
            # url_image: sintaxis por conveniencia para el nombre de la imagen
            url_image = f'fotos/{data["nombreFoto"]}'
            # Carga la imagen en S3 y obtiene la URL
            foto_url_s3 = await uploadS3Base64(data['foto'], url_image, config('aws_bucket_name'), 'image')

            await execute_procedure('editarFotoPlaylist', [data['id_playlist'], foto_url_s3])

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_Playlist = {
            'content' : 'Se ah actualizado con exito el Playlist: ' + data['nombre']
        }
        return new_Playlist

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}

async def eliminarPlaylist(data):
    try:
        delete_result = await execute_procedure('eliminarPlaylist', [data['id_playlist']])
        if delete_result.get('respuesta') == 0:
            return {'error404': 'No existe un playlist registrado con el ID: ' + str(data['id_playlist']) +', porfavor registrar previamente'}

        # Si todo sale correcto se devuelve un objeto playlist para despues devolver un 200
        new_playlist = {
            'content' : 'Se ha eliminado con exito el playlist: ' + str(data['id_playlist'])
        }
        return new_playlist

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}

async def obtenerPlaylistxId(data):
    try:
        get_Playlist = await execute_procedure('obtenerPlaylistxId', [data['id_playlist']])
        if get_Playlist.get('respuesta') == 0:
            return {'error404': 'No existe un playlist registrado con el ID: ' + data['id_playlist'] +', porfavor registrar previamente'}

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_playlist = {
            'content' : get_Playlist
        }
        return new_playlist

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}

async def obtenerPlaylistsUsario(data):
    try:
        get_Playlists = await execute_procedure('obtenerPlaylistsUsario', [data['id_usuario']])
        
        print(get_Playlists)

         # Es una lista.
        if isinstance(get_Playlists, list):
            new_cancion = {
                'content' : get_Playlists
            }
            return new_cancion
        
        #Es un diccionario.
        if get_Playlists.get('respuesta') == 0:
            return {'error404': 'No existe un usuario registrado con el ID: ' + str(data['id_usuario']) +', porfavor registrar previamente'}

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_playlist = {
            'content' : [get_Playlists]
        }
        return new_playlist

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}

async def obtenerPlaylists():
    try:
        get_Playlists = await execute_procedure('obtenerPlaylists')

        # Esta vacio...
        if isinstance(get_Playlists, dict):
            new_playlist = {
                'content' : []
            }
            return new_playlist

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_playlist = {
            'content' : get_Playlists
        }
        return new_playlist

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}
