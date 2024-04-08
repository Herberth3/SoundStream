from decouple import config
from configs.mysql_config import execute_procedure
from configs.s3_config import uploadS3Base64

async def editarUsuario(data):
    try:
        # Guardo al usuario en la base de datos
        update_result = await execute_procedure('editarUsuario', [data['nombres'], data['apellidos'], data['email']])
        if update_result.get('respuesta') == 0:
            return {'error404': 'No existe un usuario registrado con el correo: ' + data['email'] +', porfavor registrate previamente'}

        # Subo la imagen al bucket si se desea
        if update_result['respuesta'] == 1 and data['nombreFoto'] != '' and data['foto'] != '':
            # url_image: sintaxis por conveniencia para el nombre de la imagen
            url_image = f'fotos/{data["nombreFoto"]}'
            # Carga la imagen en S3 y obtiene la URL
            foto_url_s3 = await uploadS3Base64(data['foto'], url_image, config('aws_bucket_name'), 'image')

            await execute_procedure('editarFotoUsuario', [data['email'], foto_url_s3])

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_usuario = {
            'content' : 'Se ha actualizado con exito el usuario: ' + data['nombres'] + ' ' + data['apellidos'],
            'nombre': data['nombres'],
            'apellidos' : data['apellidos']
        }
        return new_usuario

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}
    
async def obtenerUsuario(data):
    try:
        get_user = await execute_procedure('obtenerUsuario', [data['email']])
        if get_user.get('respuesta') == 0:
            return {'error404': 'No existe un usuario registrado con el correo: ' + data['email'] +', porfavor registrate previamente'}

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_usuario = {
            'content' : get_user,
            'email': data['email']
        }
        return new_usuario

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}