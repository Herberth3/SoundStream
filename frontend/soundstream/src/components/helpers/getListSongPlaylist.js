import { API_LOCAL_URL, ENPOINT_SONG_PLAYLIST } from '../../env';

export const getListSongPlaylist = async (idPlaylist, setListSongPlaylist, listSong) => {

    const url = API_LOCAL_URL + ENPOINT_SONG_PLAYLIST;

    const playlistList = {
        id_playlist: idPlaylist
    };


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
        const dataSong = data.content.map((song) => {
            const songExist = listSong.find((songList) => songList.id_cancion === song.id_cancion);
            return songExist;
        });

        setListSongPlaylist(dataSong);
    }
}
