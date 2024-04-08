import { API_LOCAL_URL, ENPOINT_CREAR_PLAYLIST } from '../../env';

const Swal = require('sweetalert2');

export const setPlaylist = async (form, photo, user) => {

    const url = API_LOCAL_URL + ENPOINT_CREAR_PLAYLIST;

    const newPlaylist = {
        id_usuario: user.data.id_usuario,
        nombre: form.nombre,
        descrip: form.descripcion,
        nombreFoto: photo.name,
        foto: photo.base64,
    };

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPlaylist)
    });

    const data = await rep.json();
    const status = rep.status;

    if (status === 200) {

        Swal.fire({
            title: 'Playlist.',
            text: `Se ha creado exitosamente la playlist: ${newPlaylist.nombre} `,
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