import { API_LOCAL_URL, ENPOINT_ELIMINAR_CANCION } from '../../env';

const Swal = require('sweetalert2');


export const deleteSong = async(password, id_song) => {

    // Validar contraseña.
    if (password !== 'admin') {
        Swal.fire({
            title: 'Oops...',
            text: 'Contraseña incorrecta',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return;
    }

    const songDelete = {
        id_cancion: parseInt(id_song)
    }

    const url = API_LOCAL_URL + ENPOINT_ELIMINAR_CANCION;

    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(songDelete)
    });

    const status = resp.status;
    const data = await resp.json();

    if (status === 200) {  //Elimianr cancion.
        Swal.fire({
            title: 'Canción.',
            text: `${data.content}`,
            icon: 'success',
            confirmButtonText: 'Ok'
        });

    } else { //Error al eliminar cancion.
        Swal.fire({
            title: 'Error!',
            text: `${data.content}`,
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }
}
