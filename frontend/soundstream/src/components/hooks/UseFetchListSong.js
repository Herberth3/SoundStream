import { useState, useEffect } from 'react';
import { getListSong } from '../helpers';

export const UseFetchListSong = () => {

    const [song, setSong] = useState({
        listSong: [],
    });


    useEffect(() => {

        getListSong()
            .then(songData => {
                setSong({
                    listSong: songData,
                });
            })


    }, [song]);


    return song;

}
