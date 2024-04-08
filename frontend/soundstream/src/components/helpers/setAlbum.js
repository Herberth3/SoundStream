import { API_LOCAL_URL, ENPOINT_CREAR_ALBUM } from '../../env'

const Swal = require('sweetalert2');

export const setAlbum = async (form, photo) => {

    const url = API_LOCAL_URL + ENPOINT_CREAR_ALBUM;

    const newAlbum = {
        id_artista: form.idArtista,
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
        body: JSON.stringify(newAlbum)
    });


    // Respuesta del backend.
    const data = await rep.json();
    const status = rep.status;

    if (status === 200) {
        Swal.fire({
            title: 'Álbum.',
            text: 'Se ha creado exitosamente el álbum.',
            icon: 'success',
            confirmButtonText: 'Ok'
        });

    } else {

        Swal.fire({
            title: 'Álbum.',
            text: `${data.content}`,
            icon: 'success',
            confirmButtonText: 'Ok'
        });

    }
}
