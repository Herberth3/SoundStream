import { API_LOCAL_URL, ENPOINT_ADD_SONG_PLAYLIST } from '../../env';

const Swal = require('sweetalert2');

export const addSongPlaylist = async (idCancion, idPlaylist, setUpdate) => {

    const url = API_LOCAL_URL + ENPOINT_ADD_SONG_PLAYLIST;

    const newSong = {
        id_cancion: idCancion,
        id_playlist: idPlaylist
    };


    // console.log(newSong);

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
