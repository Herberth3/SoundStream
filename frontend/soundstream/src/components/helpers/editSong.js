import { API_LOCAL_URL, ENPOINT_EDITAR_CANCION } from '../../env';

const Swal = require('sweetalert2');

export const editSong = async (form, photo, song, idSong) => {

    const url = API_LOCAL_URL + ENPOINT_EDITAR_CANCION;

    const newSong = {
        id_artista: parseInt(form.idArtista),
        id_cancion: idSong,
        nombre: form.nombre,
        nombreFoto: photo.name,
        foto: photo.base64,
        duracion: form.duracion,
        nombreCancion: song.name,
        mp3: song.base64
    };


    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSong)
    });

    const status = rep.status;
    const data = await rep.json();


    if (status === 200) {  //Editar canción.
        Swal.fire({
            title: 'Exito.',
            text: `${data.content}`,
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
