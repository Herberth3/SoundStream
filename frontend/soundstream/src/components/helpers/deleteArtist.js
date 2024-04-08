import { API_LOCAL_URL, ENPOINT_ELIMINAR_ARTISTA } from '../../env';

const Swal = require('sweetalert2');

export const deleteArtist = async (artist, password) => {

    console.log(artist);

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

    const artistName = {
        id_artista: artist.id_artista
    };

    const url = API_LOCAL_URL + ENPOINT_ELIMINAR_ARTISTA;

    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(artistName)
    });


    const status = resp.status;
    const data = await resp.json();

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
