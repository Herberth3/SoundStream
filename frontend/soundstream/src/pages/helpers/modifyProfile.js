import { API_LOCAL_URL, ENPOINT_MODIFY_PROFILE } from '../../env';
const Swal = require('sweetalert2');

export const modifyProfile = async (form, user, photo, setChangeProfile) => {

    const url = API_LOCAL_URL + ENPOINT_MODIFY_PROFILE;

    const newData = {
        nombres: form.nombre,
        apellidos: form.apellido,
        email: user.data.correo,
        nombreFoto: photo.name,
        foto: photo.base64
    }

    
    // Peticion al backend.
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
        .then(res => res.json())
        .then(data => {

            setChangeProfile(true); //Aviso de cambio de perfil.

            Swal.fire({
                title: 'Exito.',
                text: `${data.content}`,
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        })
        .catch(err => {
            Swal.fire({
                title: 'Error!',
                text: 'Error al modificar los datos.',
                icon: `${err}`,
                confirmButtonText: 'Ok'
            });
        })
}
