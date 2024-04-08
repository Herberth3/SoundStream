from decouple import config
from configs.mysql_config import execute_procedure
from configs.s3_config import uploadS3Base64
import bcrypt

async def insertarUsuario(data):
    try:
        urlFoto = '-'

        # Encripta la contraseña usando bcrypt
        if data['contra']:
            contra = bcrypt.hashpw(data['contra'].encode('utf-8'), bcrypt.gensalt(10)).decode('utf-8')

        # Llama al procedimiento almacenado insertarUsuario en Python
        # insert_result almacena el ID del usuario insertado o 0 si el usuario ya existe
        insert_result = await execute_procedure('insertarUsuario', [data['nombres'], data['apellidos'], data['email'], contra, data['fecha'], urlFoto])
        if insert_result.get('respuesta') == 0:
            return {'error404': 'Ya existe un usuario registrado con el correo: ' + data['email']}

        if data['nombreFoto'] != '' and data['foto'] != '':
            # url_image: sintaxis por conveniencia para el nombre de la imagen
            url_image = f'fotos/{data["nombreFoto"]}'
            # Carga la imagen en S3 y obtiene la URL
            foto_url_s3 = await uploadS3Base64(data['foto'], url_image, config('aws_bucket_name'), 'image')

            await execute_procedure('editarFotoUsuario', [data['email'], foto_url_s3])

        new_usuario = {
            'id_usario' : insert_result['respuesta'],
            'nombre': data['nombres'],
            'apellidos' : data['apellidos'],
            'email' : data['email'],
            'contra' : contra,
            'fecha': data['fecha'],
            'foto': foto_url_s3
        }
        return new_usuario

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}
    
async def login(data):
    try:
        get_user = await execute_procedure('obtenerUsuario', [data['email']])
        if get_user.get('respuesta') == 0:
            return {'error404': 'No existe un usuario registrado con el correo: ' + data['email'] +', porfavor registrate previamente'}

        # Valido la contraseña encriptada con la entrante
        validate_password = False
        if data['contra']:
            # get_user[4] sería la contraseña encriptada almacenada en la base de datos
            # bcrypt.checkpw compara la contraseña en texto claro (contra) con la contraseña encriptada
            validate_password = bcrypt.checkpw(data['contra'].encode('utf-8'), get_user['contra'].encode('utf-8'))

        if not validate_password:
            return {'error404': 'Datos Invalidos, intente de nuevo'}

        # Si todo sale correcto se devuelve un objeto artista para despues devolver un 200
        new_usuario = {
            'content' : [get_user],
            'email': data['email']
        }
        return new_usuario

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}