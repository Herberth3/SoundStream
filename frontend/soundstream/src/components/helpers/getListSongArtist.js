import { API_LOCAL_URL, ENPOINT_SONG_ARTIST } from '../../env'


export const getListSongArtist = async (id_artista, setListSongArtist) => {

    const url = API_LOCAL_URL + ENPOINT_SONG_ARTIST;

    const idArtista = {
        id_artista: id_artista
    };

    const rep = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(idArtista)
    });


    // Respuesta del backend.
    const data = await rep.json();
    const status = rep.status;

    if (status === 200) {
        setListSongArtist(data.content);
    }
    else {
        console.log("Error al obtener las canciones del artista.", `${data.content}`);
    }

}
