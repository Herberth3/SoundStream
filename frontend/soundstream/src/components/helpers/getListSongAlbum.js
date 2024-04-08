import { API_LOCAL_URL, ENPOINT_SONG_ALBUM } from '../../env';

export const getListSongAlbum = async (id_album, setListSongAlbum) => {

    const url = API_LOCAL_URL + ENPOINT_SONG_ALBUM;

    const idAlbum = {
        id_album: id_album,
    };

    const rep = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(idAlbum)
    });


    // Respuesta del backend.
    const data = await rep.json();
    const status = rep.status;

    if (status === 200) {
        setListSongAlbum(data.content);
    }
   
}
