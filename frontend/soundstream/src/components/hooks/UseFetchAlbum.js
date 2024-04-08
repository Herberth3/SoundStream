import { useState, useEffect } from 'react';
import { getListAlbum } from '../helpers';

export const UseFetchAlbum = () => {

    const [album, setAlbum] = useState({
        listAlbum: [],
    });

    useEffect(() => {

        getListAlbum()
        .then(albumData => {
            setAlbum({
                listAlbum: albumData, 
            });
        })


    }, [album])


    return album;

}
