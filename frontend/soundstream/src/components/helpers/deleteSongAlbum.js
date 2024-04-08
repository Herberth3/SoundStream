import { API_LOCAL_URL, ENPOINT_DELETE_SONG_ALBUM } from '../../env';

const Swal = require('sweetalert2');


export const deleteSongAlbum = async (id_cancion, id_album, setUpdate) => {

    const url = API_LOCAL_URL + ENPOINT_DELETE_SONG_ALBUM;

    const albumSong = {
        id_cancion: id_cancion,
        id_album: id_album,
    };

    const rep = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(albumSong)
    });


    // Respuesta del backend.
    const data = await rep.json();
    const status = rep.status;

    if (status === 200) {

        setUpdate({
            add: false,
            delete: true,
        });

        Swal.fire({
            title: 'Álbum.',
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
