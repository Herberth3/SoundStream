import { API_LOCAL_URL, ENPOINT_LOGIN } from '../../env';
import { modifyProfile } from './modifyProfile';

const Swal = require('sweetalert2');


export const verifyProfile = async (form, user, photo, setChangeProfile) => {

    const credentials = {
        email: user.data.correo,
        contra: form.contra,
    };

    const url = API_LOCAL_URL + ENPOINT_LOGIN;

    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    const status = rep.status;

    if (status === 200) { //Usuario Existente.

        modifyProfile(form, user, photo, setChangeProfile); // Modificar perfil.

    } else {  //Usuario no existe.

        Swal.fire({
            title: 'Error!',
            text: 'Contraseña incorrecta.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });

    }
}
