import { API_LOCAL_URL, ENPOINT_ADD_SONG_ALBUM } from '../../env';

const Swal = require('sweetalert2');

export const addSongAlbum = async(id_cancion, id_album, setUpdate) => {

    const url = API_LOCAL_URL + ENPOINT_ADD_SONG_ALBUM;

    const newSong = {
        id_cancion: id_cancion,
        id_album: id_album,
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

    if (status === 200) { //Insertar cancion al album

        setUpdate({
            add: true,
            delete: false,
        });

        Swal.fire({
            title: 'Exitoso.',
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
