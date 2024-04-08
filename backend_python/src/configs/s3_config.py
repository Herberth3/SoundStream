from decouple import config
from io import BytesIO
from PIL import Image
import boto3
import base64

# Configurar la conexión a AWS
s3 = boto3.client(
    's3',
    aws_access_key_id = config('aws_access_key_id'),
    aws_secret_access_key = config('aws_secret_access_key'),
    region_name = config('aws_region')  # Si aws_region no se especifica en el archivo .env, usa 'us-east-1' como valor predeterminado
)


def base64_to_data(base64_data):
    try:
        # Decodificar los datos base64
        decoded_data = base64.b64decode(base64_data)
        return decoded_data
        
    except Exception as e:
        raise ValueError("Los datos no son válidos.") from e
    

async def uploadS3Base64(file_data, file_name, bucket_name, content_type):
    try:
        data = base64_to_data(file_data)
        
        s3.put_object(
            Bucket=bucket_name,
            Key=file_name,
            Body=data,
            ContentType=content_type  # Ajusta el tipo de contenido
        )
        # Devuelve la URL del archivo en S3
        return f'https://{bucket_name}.s3.amazonaws.com/{file_name}'
    except Exception as e:
        raise ValueError(f"Error al cargar el archivo en S3: {e}") from e
