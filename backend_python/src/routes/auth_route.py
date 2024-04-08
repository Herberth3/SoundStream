from flask import Blueprint
from flask import request, jsonify
from controllers.auth_controller import insertarUsuario, login

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/signup', methods=['POST'])
async def signup_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        usuario = await insertarUsuario(data)
        if 'error404' in usuario:
            return jsonify(content=usuario['error404']), 404 
        elif 'error' in usuario:
            return jsonify(content=usuario['error']), 500 # 500 Internal Server Error
        return jsonify(content=usuario), 200 # 200 Created
    else:
        return jsonify(content='Datos de usuario no válidos'), 400 # 400 Bad Request
    
@auth_blueprint.route('/login', methods=['POST'])
async def login_route():
    data = request.json

    if data:
        # Espera a que la función asíncrona termine
        usuario = await login(data)
        if 'error404' in usuario:
            return jsonify(content=usuario['error404']), 404 
        elif 'error' in usuario:
            return jsonify(content=usuario['error']), 500 # 500 Internal Server Error
        return jsonify(content=usuario['content']), 200 # 200 Created
    else:
        return jsonify(content='Datos de usuario no válidos'), 400 # 400 Bad Request