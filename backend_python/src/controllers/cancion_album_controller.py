from decouple import config
from configs.mysql_config import execute_procedure
from configs.s3_config import uploadS3Base64

async def insertarCancionAlbum(data):
    try:

        # Guardo al artista en la base de datos
        insert_result = await execute_procedure('insertarCancionAlbum', [data['id_cancion'], data['id_album']])
        if insert_result.get('respuesta') == 0:
            return {'error404': 'La cancion con el id: ' + str(data['id_cancion']) + ', no esta dispoible, porque ya se encuentra registrada para un album'}

        new_insercion = {
            'content' : 'Se agrego correctamente el ID de la cancion' + str(data['id_cancion']) + ', para el ID del album' + str(data['id_album'])
        }
        return new_insercion

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}
    
async def eliminarCancionAlbum(data):
    try:
        delete_result = await execute_procedure('eliminarCancionAlbum', [data['id_cancion'], data['id_album']])
        if delete_result.get('respuesta') == 0:
            return {'error404': 'Datos invalidos: ID cancion: ' + str(data['id_cancion']) + ', ID album: ,' + str(data['id_album']) + ' porfavor verificar'}

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_delete = {
            'content': 'Se elimino con exito la cancion: ' + str(data['id_cancion']) + ', para el ID del album: ' + str(data['id_album'])
        }
        return new_delete

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}

async def obtenerCancionesAlbum(data):
    try:
        get_canciones = await execute_procedure('obtenerCancionesAlbum', [data['id_album']])
        
          # Es una lista.
        if isinstance(get_canciones, list):
            new_album = {
                'content' : get_canciones
            }
            return new_album
        
        #Es un diccionario.
        if get_canciones.get('respuesta') == 0:
            return {'error404': 'No existe un album registrado con el ID: ' + str(data['id_album']) +', porfavor registrar previamente'}

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_album = {
            'content' : [get_canciones]
        }
        return new_album

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}
