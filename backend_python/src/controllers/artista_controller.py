from decouple import config
from configs.mysql_config import execute_procedure
from configs.s3_config import uploadS3Base64

async def insertarArtista(data):
    try:
        urlFoto = '-'
        # Llama al procedimiento almacenado insertarArtista en Python
        # insert_result almacena el ID del usuario insertado o 0 si el usuario ya existe
        insert_result = await execute_procedure('insertarArtista', [data['nombre'], urlFoto, data['fecha']])
        if insert_result.get('respuesta') == 0:
            return {'error404': 'Ya existe un artista registrado con el nombre: ' + data['nombre']}

        if data['nombreFoto'] != '' and data['foto'] != '':
            # url_image: sintaxis por conveniencia para el nombre de la imagen
            url_image = f'fotos/{data["nombreFoto"]}'
            # Carga la imagen en S3 y obtiene la URL
            foto_url_s3 = await uploadS3Base64(data['foto'], url_image, config('aws_bucket_name'), 'image')
            id_artista = insert_result['respuesta']

            await execute_procedure('editarFotoArtista', [id_artista, foto_url_s3])

        new_artista = {
            'id_artista' : insert_result['respuesta'],
            'nombre': data['nombre'],
            'foto': urlFoto,
            'fecha': data['fecha']
        }
        return new_artista

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}
    
async def editarArtista(data):
    try:
        # Guardo al artista en la base de datos
        update_result = await execute_procedure('editarArtista', [data['id_artista'], data['nombre']])
        if update_result.get('respuesta') == 0:
            return {'error404': 'No existe un artista registrado con el ID: ' + str(data['id_artista']) +', porfavor registrar previamente'}

        # Subo la imagen al bucket si se desea
        if update_result['respuesta'] == 1 and data['nombreFoto'] != '' and data['foto'] != '':
            # url_image: sintaxis por conveniencia para el nombre de la imagen
            url_image = f'fotos/{data["nombreFoto"]}'
            # Carga la imagen en S3 y obtiene la URL
            foto_url_s3 = await uploadS3Base64(data['foto'], url_image, config('aws_bucket_name'), 'image')

            await execute_procedure('editarFotoArtista', [data['id_artista'], foto_url_s3])

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_artista = {
            'content' : 'Se ha actualizado con exito el Artista: ' + data['nombre'],
            'nombre': data['nombre']
        }
        return new_artista

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}

async def eliminarArtista(data):
    try:
        delete_result = await execute_procedure('eliminarArtista', [data['id_artista']])
        if delete_result.get('respuesta') == 0:
            return {'error404': 'No existe un artista registrado con el ID: ' + data['id_artista'] +', porfavor registrar previamente'}

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_artista = {
            'content' : 'Se ha eliminado con exito el Artista',
            'id': data['id_artista']
        }
        return new_artista

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}
    
async def obtenerArtistaxNombre(data):
    try:
        get_artist = await execute_procedure('obtenerArtistaxNombre', [data['nombre']])
        if get_artist.get('respuesta') == 0:
            return {'error404': 'No existe un artista registrado con el nombre: ' + data['nombre'] +', porfavor registrar previamente'}

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_artista = {
            'content' : get_artist,
            'nombre': data['nombre']
        }
        return new_artista

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}
    
async def obtenerArtistaxId(data):
    try:
        get_artist = await execute_procedure('obtenerArtistaxId', [data['id_artista']])
        if get_artist.get('respuesta') == 0:
            return {'error404': 'No existe un artista registrado con el id: ' + data['id_artista'] +', porfavor registrar previamente'}

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_artista = {
            'content' : get_artist,
            'id': data['id_artista']
        }
        return new_artista

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}
    
async def obtenerArtistas():
    try:
        get_artistas = await execute_procedure('obtenerArtistas')

        # Esta vacio...
        if isinstance(get_artistas, dict):
            new_artistas = {
                'content' : []
            }
            return new_artistas

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_artistas = {
            'content' : get_artistas
        }
        return new_artistas

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}