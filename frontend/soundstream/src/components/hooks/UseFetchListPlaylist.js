import { useState, useEffect } from 'react';
import { getListPlaylist } from '../helpers';


export const UseFetchListPlaylist = () => {

    const [playlist, setPlaylist] = useState({
        listPlaylist: [],
    });

    useEffect(() => {

        getListPlaylist()
            .then(playlistData => {
                setPlaylist({
                    listPlaylist: playlistData,
                });
            })
    }, [playlist]);

    return playlist;
}
