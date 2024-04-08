import { API_LOCAL_URL, ENPOINT_DELETE_SONG_PLAYLIST } from '../../env';

const Swal = require('sweetalert2');


export const deleteSongPlaylist = async (idCancion, idPlaylist, setUpdate) => {

    const url = API_LOCAL_URL + ENPOINT_DELETE_SONG_PLAYLIST;

    const playlistSong = {
        id_cancion: idCancion,
        id_playlist: idPlaylist,
    };

    const rep = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(playlistSong)
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
