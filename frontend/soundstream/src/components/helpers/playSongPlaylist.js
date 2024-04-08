import { API_LOCAL_URL, ENPOINT_SONG_PLAYLIST } from '../../env';

export const playSongPlaylist = async (idPlaylist, setPlayer, listSong, listArtist) => {

    const url = API_LOCAL_URL + ENPOINT_SONG_PLAYLIST;


    //Obtener artista por ID.
    const getArtist = (id) => {
        const artistName = listArtist.find(artist => artist.id_artista === id);
        if (artistName) {
            return artistName.nombre;
        }
        return null;
    }


    // Objeto a enviar.
    const playlistList = {
        id_playlist: idPlaylist
    };


    // Petición al backend.
    const rep = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(playlistList)
    });


    // Respuesta del backend.
    const data = await rep.json();
    const status = rep.status;

    if (status === 200) {

        const songPlay = data.content.map((song) => {

            const songExist = listSong.find((songList) => songList.id_cancion === song.id_cancion);

            return {
                name: songExist.nombre,
                artist: getArtist(songExist.id_artista),
                src: songExist.mp3
            }

        });

        console.log(songPlay);
        setPlayer(songPlay);

    }
}



