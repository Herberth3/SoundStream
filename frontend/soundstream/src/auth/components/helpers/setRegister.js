import { API_LOCAL_URL, ENPOINT_REGISTER } from '../../../env'
import { setFavorite } from './setFavorite';

const Swal = require('sweetalert2');


export const setRegister = async (form, photo, month) => {

    const date = new Date(`${form.anio}-${month}-${form.dia}`);

    const url = API_LOCAL_URL + ENPOINT_REGISTER;

    const newUser = {
        nombres: form.nombre,
        apellidos: form.apellido,
        email: form.email,
        contra: form.contasenia,
        fecha: date,
        nombreFoto: photo.name,
        foto: photo.base64
    };

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });

    const data = await rep.json();
    const status = rep.status;

    if (status === 200) {

        setFavorite(data.content); //Crea la playlist favoritos.

        Swal.fire({
            title: 'Registro.',
            text: 'Se ha registrado exitosamente.',
            icon: 'success',
            confirmButtonText: 'Ok'
        });

    } else {

        Swal.fire({
            title: 'Error!',
            text: `${data.content}`,
            icon: 'error',
            confirmButtonText: 'Ok'
        });

    }
}
