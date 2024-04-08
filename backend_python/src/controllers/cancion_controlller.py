from decouple import config
from configs.mysql_config import execute_procedure
from configs.s3_config import uploadS3Base64

async def insertarCancion(data):
    try:
        urlFoto = '-'
        urlCancion = '-'
        enblanco = '-'

        # Guardo al artista en la base de datos
        insert_result = await execute_procedure('insertarCancion', [data['id_artista'], data['nombre'], urlFoto, enblanco, urlCancion])
        if insert_result.get('respuesta') == 0:
            return {'error404': 'Ya existe una cancion registrada con el nombre: ' + data['nombre'] + ', para el id de artista: '+ data['id_artista']}

        if data['nombreFoto'] != '' and data['foto'] != '':
            # url_image: sintaxis por conveniencia para el nombre de la imagen
            url_image = f'fotos/{data["nombreFoto"]}'
            # Carga la imagen en S3 y obtiene la URL
            urlFoto = await uploadS3Base64(data['foto'], url_image, config('aws_bucket_name'), 'image')
            id_cancion = insert_result['respuesta']
            # Edito la cancion en la base de datos
            await execute_procedure('editarFotoCancion', [id_cancion, urlFoto])

        if data['duracion'] != '' and data['nombreCancion'] != '' and data['mp3'] != '':
            # url_mp3: sintaxis por conveniencia para el nombre de la musica
            url_mp3 = f'musica/{data["nombreCancion"]}'
            # Carga el mp3 en S3 y obtiene la URL
            urlCancion = await uploadS3Base64(data['mp3'], url_mp3, config('aws_bucket_name'), 'audio/mpeg')
            id_cancion = insert_result['respuesta']
            # Edito la cancion en la base de datos
            await execute_procedure('editarMp3Cancion', [id_cancion, data['duracion'], urlCancion])

        new_cancion = {
            'id_cancion' : insert_result['respuesta'],
            'id_artista' : data['id_artista'],
            'nombre': data['nombre'],
            'foto': urlFoto,
            'duracion': data['duracion'],
            'mp3' : urlCancion
        }
        return new_cancion

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}
    
async def editarCancion(data):
    try:
        # Actualizo la cancion en la base de datos
        update_result = await execute_procedure('editarCancion', [data['id_artista'], data['id_cancion'], data['nombre']])
        if update_result.get('respuesta') == 0:
            return {'error404': 'Datos invalidos, puede ser que el nombre: ' + data['nombre'] +' no este disponible o que el artista con el ID: ' + str(data['id_artista']) + ' no este registrado, porfavor registrar previamente'}

        # Subo la imagen al bucket si se desea
        if data['nombreFoto'] != '' and data['foto'] != '':
            # url_image: sintaxis por conveniencia para el nombre de la imagen
            url_image = f'fotos/{data["nombreFoto"]}'
            # Carga la imagen en S3 y obtiene la URL
            foto_url_s3 = await uploadS3Base64(data['foto'], url_image, config('aws_bucket_name'), 'image')

            await execute_procedure('editarFotoCancion', [data['id_cancion'], foto_url_s3])

        if data['duracion'] != '' and data['nombreCancion'] != '' and data['mp3'] != '':
            # url_mp3: sintaxis por conveniencia para el nombre de la musica
            url_mp3 = f'musica/{data["nombreCancion"]}'
            # Carga el mp3 en S3 y obtiene la URL
            urlCancion = await uploadS3Base64(data['mp3'], url_mp3, config('aws_bucket_name'), 'audio/mpeg')
            
            # Edito la cancion en la base de datos
            await execute_procedure('editarMp3Cancion', [data['id_cancion'], data['duracion'], urlCancion])

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_cancion = {
            'content' : 'Se ha actualizado con exito el Artista: ' + data['nombre'],
            'nombre': data['nombre']
        }
        return new_cancion

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}

async def eliminarCancion(data):
    try:
        delete_result = await execute_procedure('eliminarCancion', [data['id_cancion']])
        if delete_result.get('respuesta') == 0:
            return {'error404': 'No existe una cancion registrado con el ID: ' + str(data['id_cancion']) +', porfavor registrar previamente'}

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_cancion = {
            'content' : 'Se ha eliminado con exito la cancion con ID: ' + str(data['id_cancion']),
            'id': data['id_cancion']
        }
        return new_cancion

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}

async def obtenerCancionxNombre(data):
    try:
        get_cancion = await execute_procedure('obtenerCancionxNombre', [data['nombre']])
        if get_cancion.get('respuesta') == 0:
            return {'error404': 'No existe una cancion registrado con el nombre: ' + data['nombre'] +', porfavor registrar previamente'}

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_cancion = {
            'content' : get_cancion,
            'nombre': data['nombre']
        }
        return new_cancion

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}

async def obtenerCancionxId(data):
    try:
        get_cancion = await execute_procedure('obtenerCancionxId', [data['id_cancion']])
        if get_cancion.get('respuesta') == 0:
            return {'error404': 'No existe una cancion registrado con el ID: ' + str(data['id_cancion']) +', porfavor registrar previamente'}

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_cancion = {
            'content' : get_cancion,
            'id': data['id_cancion']
        }
        return new_cancion

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}

async def obtenerCancionesArtista(data):
    try:
        get_canciones = await execute_procedure('obtenerCancionesArtista', [data['id_artista']])

        # Es una lista.
        if isinstance(get_canciones, list):
            new_cancion = {
                'content' : get_canciones
            }
            return new_cancion
        

        #Es un diccionario.
        if get_canciones.get('respuesta') == 0:
            return {'error404': 'No existe un artista registrado con el ID: ' + str(data['id_artista']) +', porfavor registrar previamente'}


        #Un unico valor.
        new_cancion = {
            'content' : [get_canciones]
        }
        return new_cancion

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}

async def obtenerCanciones():
    try:
        get_canciones = await execute_procedure('obtenerCanciones')

        # Esta vacio...
        if isinstance(get_canciones, dict):
            new_artistas = {
                'content' : []
            }
            return new_artistas
        

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_artistas = {
            'content' : get_canciones
        }
        return new_artistas

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}