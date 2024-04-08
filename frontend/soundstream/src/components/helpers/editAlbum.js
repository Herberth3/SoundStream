import { API_LOCAL_URL, ENPOINT_EDITAR_ALBUM } from '../../env';

const Swal = require('sweetalert2');


export const editAlbum = async (form, photo, idAlbum) => {

    const url = API_LOCAL_URL + ENPOINT_EDITAR_ALBUM;

    const newAlbum = {
        id_artista: parseInt(form.idArtista),
        id_album: idAlbum,
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
        body: JSON.stringify(newAlbum)
    });

    const status = rep.status;
    const data = await rep.json();

    if (status === 200) {  //Editar Album.
        Swal.fire({
            title: 'Album.',
            text: `${data.content}`,
            icon: 'success',
            confirmButtonText: 'Ok'
        });

    } else { //Error al editar Album.
        Swal.fire({
            title: 'Error!',
            text: `${data.content}`,
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }

}
