# Ejecución del Servidor en Python con Flask

Para ejecutar el servidor en Python que se ha creado con Flask, sigue estos pasos:

## Requisitos Previos

Asegúrate de tener instalados los siguientes requisitos previos:

- **Python:** Debe estar instalado en tu sistema. Si no lo tienes, puedes descargarlo desde [Python.org](https://www.python.org/downloads/) e instalarlo.

- **Pip:** El gestor de paquetes de Python. Por lo general, se instala automáticamente junto con Python.

## Configuración del Entorno Virtual (Opcional pero Recomendado)

Es una buena práctica crear y utilizar un entorno virtual para tu proyecto Flask. Si deseas utilizar un entorno virtual, sigue estos pasos:

1. Abre una terminal o línea de comandos.

2. Crea un entorno virtual en la carpeta de tu proyecto ejecutando el siguiente comando:

    ```bash
    python -m venv venv

3. Activa el entorno virtual:

- **En Windows:** Ejecuta el comando `venv\Scripts\activate`.

- **En macOS y Linux:** Ejecuta el comando `source venv/bin/activate`.

4. Tu entorno virtual está activado cuando veas el prefijo `(venv)` en la línea de comandos.

## Instalación de Dependencias

1. Asegúrate de que estás en el directorio raíz de tu proyecto y ejecuta el siguiente comando para instalar las dependencias de tu aplicación desde el archivo `requirements.txt`:

    ```bash
    pip install -r requirements.txt

## Ejecución del Servidor

1. En la línea de comandos, navega hasta el directorio raíz de tu proyecto.

2. Ejecuta el siguiente comando para iniciar el servidor Flask:

    ```bash
    python app.py

3. El servidor se ejecutará y mostrará mensajes en la consola que indicarán en qué dirección y puerto está escuchando.

4. Abre un navegador web y accede a la URL donde se ejecuta tu servidor (por defecto, [http://localhost:5000](http://localhost:5000)).

¡Listo! Tu servidor en Python con Flask debería estar en funcionamiento y listo para responder a las solicitudes.

## Detener el Servidor

Para detener el servidor, puedes presionar `Ctrl + C` en la línea de comandos donde se está ejecutando. Luego, puedes desactivar el entorno virtual (si lo usaste) ejecutando `deactivate` (en Windows) o simplemente cerrando la terminal (en macOS y Linux).

¡Disfruta de tu servidor en Python!
