from decouple import config
from configs.mysql_config import execute_procedure
from configs.s3_config import uploadS3Base64

async def insertarCancionPlaylist(data):
    try:
        # Guardo al artista en la base de datos
        insert_result = await execute_procedure('insertarCancionPlaylist', [data['id_cancion'], data['id_playlist']])
        if insert_result.get('respuesta') == 0:
            return {'error404': 'La cancion con el ID: ' + str(data['id_cancion']) + ', ya se encuentra registrada para el ID Playlist: '+ str(data['id_playlist'])}

        new_cancion = {
            'content' : 'Se agrego correctamente el ID de la cancion: ' + str(data['id_cancion']) + ', para el ID del Playlist: ' + str(data['id_playlist'])
        }
        return new_cancion

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}

async def eliminarCancionPlaylist(data):
    try:
        delete_result = await execute_procedure('eliminarCancionPlaylist', [data['id_cancion'], data['id_playlist']])
        if delete_result.get('respuesta') == 0:
            return {'error404': 'Datos invalidos: ID cancion: ' +str(data['id_cancion']) +', ID Playlist: ,' + str(data['id_playlist']) + ' porfavor verificar'}

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_cancion = {
            'content' : 'Se ha eliminado con exito la cancion con ID: ' + str(data['id_cancion']) + ', para el ID del Playlist: ' + str(data['id_playlist'])
        }
        return new_cancion

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}

async def obtenerCancionesPlaylist(data):
    try:
        get_canciones = await execute_procedure('obtenerCancionesPlaylist', [data['id_playlist']])
        
         # Es una lista.
        if isinstance(get_canciones, list):
            new_cancion = {
                'content' : get_canciones
            }
            return new_cancion

        #Es un diccionario.
        if get_canciones.get('respuesta') == 0:
            return {'error404': 'No existe una playlist registrado con el ID: ' + str(data['id_playlist']) +', porfavor registrar previamente'}

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_cancion = {
            'content' : [get_canciones]
        }
        return new_cancion

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}