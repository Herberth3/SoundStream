import { API_LOCAL_URL, ENPOINT_ELIMINAR_ALBUM } from '../../env';

const Swal = require('sweetalert2');

export const deleteAlbum = async(id_album, password) => {

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



    const url = API_LOCAL_URL + ENPOINT_ELIMINAR_ALBUM;

    const idAlbum = {
        id_album: id_album
    }

    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(idAlbum)
    });


    const status = resp.status;
    const data = await resp.json();

    if (status === 200) {  //Editar Artista.
        Swal.fire({
            title: 'Album.',
            text: `${data.content}`,
            icon: 'success',
            confirmButtonText: 'Ok'
        });

    } else { //Error al editar Artista.
        Swal.fire({
            title: 'Error!',
            text: `${data.content}`,
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }

}
