import { API_LOCAL_URL, ENPOINT_CREAR_CANCION } from '../../env';

const Swal = require('sweetalert2');

export const setSongArtist = async (form, photo, song) => {

    const url = API_LOCAL_URL + ENPOINT_CREAR_CANCION;

    const newSong = {
        id_artista: parseInt(form.idArtista),
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

    const data = await rep.json()
    const status = rep.status;

    if (status === 200) { //Insertar cancion

        Swal.fire({
            title: 'Exitoso.',
            text: 'Se ha creado exitosamente la canción.',
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