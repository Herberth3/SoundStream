import { API_LOCAL_URL, ENPOINT_EDITAR_ARTISTA } from '../../env';

const Swal = require('sweetalert2');


export const editArtist = async (nombre, form, photo, idArtista) => {

    const url = API_LOCAL_URL + ENPOINT_EDITAR_ARTISTA;

    const newArtist = {
        id_artista: idArtista,
        nombre: form.nombre,
        nombreFoto: photo.name,
        foto: photo.base64
    };

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArtist)
    });

    const status = rep.status;
    const data = await rep.json();

    if (status === 200) {  //Editar Artista.
        Swal.fire({
            title: 'Artista.',
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
