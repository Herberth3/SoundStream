from flask import Flask
# Configuración de CORS
from flask_cors import CORS
from routes.auth_route import auth_blueprint
from routes.admin_route import admin_blueprint
from routes.user_route import user_blueprint
import os

app = Flask(__name__)
CORS(app)

# Configuración del puerto
port = int(os.environ.get("PORT", 5000))
app.config['PORT'] = port

# Registro del blueprint
app.register_blueprint(auth_blueprint)
app.register_blueprint(user_blueprint)
app.register_blueprint(admin_blueprint)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=port)
