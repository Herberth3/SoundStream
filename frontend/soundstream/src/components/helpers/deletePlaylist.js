import { API_LOCAL_URL, ENPOINT_DELETE_PLAYLIST } from '../../env';

const Swal = require('sweetalert2');


export const deletePlaylist = async(id_playlist) => {
    
    const url = API_LOCAL_URL + ENPOINT_DELETE_PLAYLIST;

    const newPlaylist = {
        id_playlist: parseInt(id_playlist),
    };


    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPlaylist)
    });

    const status = rep.status;
    const data = await rep.json();

    if (status === 200) {  //Editar Playlist.
        Swal.fire({
            title: 'Playlist.',
            text: `${data.content}`,
            icon: 'success',
            confirmButtonText: 'Ok'
        });

    } else { //Error al editar Playlist.
        Swal.fire({
            title: 'Error!',
            text: `${data.content}`,
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }

}
