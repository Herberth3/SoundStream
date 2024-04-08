import { API_LOCAL_URL, ENPOINT_EDITAR_PLAYLIST } from '../../env';

const Swal = require('sweetalert2');


export const editPlayList = async (form, photo) => {

    const url = API_LOCAL_URL + ENPOINT_EDITAR_PLAYLIST;

    const newPlaylist = {
        id_playlist: parseInt(form.id_playlist),
        nombre: form.nombre,
        descrip: form.descripcion,
        nombreFoto: photo.name,
        foto: photo.base64
    };

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPlaylist)
    });

    const status = rep.status;
    const data = await rep.json();

    if (status === 200) {  //Editar Playlist.
        Swal.fire({
            title: 'Playlist.',
            text: `${data.content}`,
            icon: 'success',
            confirmButtonText: 'Ok'
        });

    } else { //Error al editar Playlist.
        Swal.fire({
            title: 'Error!',
            text: `${data.content}`,
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }
}
