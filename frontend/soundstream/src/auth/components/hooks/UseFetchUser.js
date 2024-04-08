import { setLogin } from "../helpers/setLogin"
const Swal = require('sweetalert2');


export const UseFetchUser = (form, onLogin, setUser) => {

    setLogin(form)
        .then(data => {

            // Si el usuario existe.
            if (data.status === 200) {

                //Usuario administrador.
                if (form.email === 'admin' && form.password === 'admin') {
                    setUser({
                        status: 200,
                        data: data.data,
                        type: 0
                    });

                    onLogin(); // Redirecciona a la pagina principal.
                    return;
                }

                // Guarda los datos del usuario en la variable global.
                setUser({
                    status: data.status,
                    data: data.data,
                    type: 1
                });

                onLogin(); // Redirecciona a la pagina principal.
            }

            // Si el usuario no existe.
            if (data.status !== 200) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Correo electronico o contraseña incorrectos',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        })
}
