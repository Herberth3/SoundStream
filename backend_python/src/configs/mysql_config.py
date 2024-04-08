import asyncio
import aiomysql
import mysql.connector
from decouple import config

# Cargar las variables de entorno desde el archivo .env
DB_HOST = config('DB_HOST')
DB_USER = config('DB_USER')
DB_PASSWORD = config('DB_PASSWORD')
DB_NAME = config('DB_NAME')


async def create_connection():
    connection = await aiomysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        db=DB_NAME,
        autocommit=True  # Configuración para autocommit, similar a commit en MySQLConnector
    )
    return connection



async def execute_procedure(proc_name, params=None):
    try:

        connection = await create_connection()
        async with connection.cursor(aiomysql.DictCursor) as cursor:
            if params is None:
                await cursor.execute(f"CALL {proc_name}()")
            else:
                # await cursor.execute(f"CALL {proc_name}(%s)", params)
                await cursor.callproc(proc_name, params)

            # Obtén el resultado del procedimiento almacenado
            response = await cursor.fetchall()
   
            if response:
                if params is None: #Para metodos GET.
                    return response
                if len(response) > 1: #Para metodos GET.
                    return response
                return response[0]
            
            # Si no hay resultados, devuelve un valor predeterminado
            return {'respuesta': 0}

    except Exception as e:
        # Maneja errores aquí (por ejemplo, registro de errores o devolución de un mensaje de error)
        print(e)
        return {'respuesta': 0}