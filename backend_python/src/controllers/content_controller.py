from flask import request, jsonify
import mysql.connector
from decouple import config
import boto3
import base64

# Configurar la conexión a AWS
s3 = boto3.client(
    's3',
    aws_access_key_id = config('aws_access_key_id'),
    aws_secret_access_key = config('aws_secret_access_key'),
    region_name = config('aws_region')  # Si aws_region no se especifica en el archivo .env, usa 'us-east-1' como valor predeterminado
)

# Cargar las variables de entorno desde el archivo .env
DB_HOST = config('DB_HOST')
DB_USER = config('DB_USER')
DB_PASSWORD = config('DB_PASSWORD')
DB_NAME = config('DB_NAME')

# Configurar la conexión a la base de datos MySQL
db_connection = mysql.connector.connect(
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASSWORD,
    database=DB_NAME
)

def upload_file_to_s3(file_data, file_name, bucket_name, content_type):
    try:
        s3.put_object(
            Bucket=bucket_name,
            Key=file_name,
            Body=file_data,
            ContentType= content_type  # Ajusta el tipo de contenido
        )
        # Devuelve la URL de la imagen en S3
        return f'https://{bucket_name}.s3.amazonaws.com/{file_name}'
    except Exception as e:
        # Maneja errores aquí
        return str(e)

def crearcancion(data):
    new_cancion = {
        'nombre': data['nombre'],
        'nombreFoto': data['nombreFoto'],
        'foto': data['foto'],
        'duracion': data['duracion'],
        'artista': data['artista'],
        'idArtista': data['idArtista'],
        'nombreCancion': data['nombreCancion'],
        'mp3': data['mp3']
    }

    # Hacer lo que necesites con los datos aquí

    return new_cancion

'''
JSON enviado desde el frontend
const newArtist = {
        nombre: form.nombre,
        nombreFoto: name,
        foto: base64,
        fecha: date
    };
'''
def crearartista(data):
    try:
        # url_image: sintaxis por conveniencia para el nombre de la imagen
        url_image = f'fotos/{data["nombreFoto"]}'

        # Convertir la cadena Base64 a un objeto bytes
        buffer_image = base64.b64decode(data['foto'])

        # Carga la imagen en S3 y obtiene la URL
        foto_url_s3 = upload_file_to_s3(buffer_image, url_image, config('aws_bucket_name'), 'image')

        cursor = db_connection.cursor()

        # Llama al procedimiento almacenado insertarArtista
        cursor.callproc('insertarArtista', (data['nombre'], foto_url_s3, data['fecha']))

        # Obtiene el resultado del procedimiento almacenado
        for result in cursor.stored_results():
            response = result.fetchone()

        # Confirma la inserción en la base de datos
        db_connection.commit()

        # Cierra el cursor
        cursor.close()

        # Comprueba el valor de respuesta del procedimiento almacenado
        if response and response[0] == 1:
            new_artista = {
                'nombre': data['nombre'],
                'foto': data['foto'],
                'fecha': data['fecha']
            }
            return new_artista
        else:
            return {'error': 'El artista ya existe en la base de datos.'}

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        return {'error': str(e)}

def crearalbum(data):
    new_album = {
        'nombre': data['nombre'],
        'nombreFoto': data['nombreFoto'],
        'foto': data['foto'],
        'artista': data['artista'],
        'idArtista': data['idArtista'],
        'descripcion': data['descripcion']
    }

    # Hacer lo que necesites con los datos aquí

    return new_album
