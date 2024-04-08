from decouple import config
from configs.mysql_config import execute_procedure
from configs.s3_config import uploadS3Base64

async def insertarAlbum(data):
    try:
        urlFoto = '-'

        # Guardo al artista en la base de datos
        insert_result = await execute_procedure('insertarAlbum', [data['id_artista'], data['nombre'], data['descrip'], urlFoto])
        if insert_result.get('respuesta') == 0:
            return {'error404': 'Ya existe un album registrado con el nombre: ' + data['nombre'] + ', para el id de artista: '+ data['id_artista']}

        if data['nombreFoto'] != '' and data['foto'] != '':
            # url_image: sintaxis por conveniencia para el nombre de la imagen
            url_image = f'fotos/{data["nombreFoto"]}'
            # Carga la imagen en S3 y obtiene la URL
            urlFoto = await uploadS3Base64(data['foto'], url_image, config('aws_bucket_name'), 'image')
            id_album = insert_result['respuesta']
            # Edito la cancion en la base de datos
            await execute_procedure('editarFotoAlbum', [id_album, urlFoto])

        new_album = {
            'id_album' : insert_result['respuesta'],
            'id_artista' : data['id_artista'],
            'nombre': data['nombre'],
            'foto': urlFoto,
            'descrip': data['descrip']
        }
        return new_album

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}
    
async def editarAlbum(data):
    try:
        # Actualizo la cancion en la base de datos
        update_result = await execute_procedure('editarAlbum', [data['id_artista'], data['id_album'], data['nombre'], data['descrip']])
        if update_result.get('respuesta') == 0:
            return {'error404': 'Datos invalidos, puede ser que el nombre: ' + data['nombre'] +' no este disponible o que el artista con el ID: ' + str(data['id_artista']) + ' no este registrado, porfavor registrar previamente'}

        # Subo la imagen al bucket si se desea
        if data['nombreFoto'] != '' and data['foto'] != '':
            # url_image: sintaxis por conveniencia para el nombre de la imagen
            url_image = f'fotos/{data["nombreFoto"]}'
            # Carga la imagen en S3 y obtiene la URL
            foto_url_s3 = await uploadS3Base64(data['foto'], url_image, config('aws_bucket_name'), 'image')

            await execute_procedure('editarFotoAlbum', [data['id_album'], foto_url_s3])

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_album = {
            'content' : 'Se ah actualizado con exito el Album: ' + data['nombre'],
            'nombre': data['nombre']
        }
        return new_album

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}

async def eliminarAlbum(data):
    try:
        delete_result = await execute_procedure('eliminarAlbum', [data['id_album']])
        if delete_result.get('respuesta') == 0:
            return {'error404': 'No existe un album registrado con el ID: ' + str(data['id_album']) +', porfavor registrar previamente'}

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_album = {
            'content' : 'Se ha eliminado con exito el album: ' + str(data['id_album'])
        }
        return new_album

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}

async def obtenerAlbumxNombre(data):
    try:
        get_album = await execute_procedure('obtenerAlbumxNombre', [data['nombre']])
        if get_album.get('respuesta') == 0:
            return {'error404': 'No existe un album registrado con el nombre: ' + data['nombre'] +', porfavor registrar previamente'}

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_album = {
            'content' : get_album,
            'nombre': data['nombre']
        }
        return new_album

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}

async def obtenerAlbumxId(data):
    try:
        get_album = await execute_procedure('obtenerAlbumxId', [data['id_album']])
        if get_album.get('respuesta') == 0:
            return {'error404': 'No existe un album registrado con el ID: ' + str(data['id_album']) +', porfavor registrar previamente'}

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_album = {
            'content' : get_album,
            'id': data['id_album']
        }
        return new_album

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}

async def obtenerAlbumsArtista(data):
    try:
        get_albums = await execute_procedure('obtenerAlbumsArtista', [data['id_artista']])
        if get_albums.get('respuesta') == 0:
            return {'error404': 'No existe un artista registrado con el ID: ' + str(data['id_artista']) +', porfavor registrar previamente'}

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_album = {
            'content' : get_albums,
            'id': data['id_artista']
        }
        return new_album

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}

async def obtenerAlbums():
    try:
        get_Albums = await execute_procedure('obtenerAlbums')

        # Esta vacio...
        if isinstance(get_Albums, dict):
            new_albums = {
                'content' : []
            }
            return new_albums
        
        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_albums = {
            'content' : get_Albums
        }
        return new_albums

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}