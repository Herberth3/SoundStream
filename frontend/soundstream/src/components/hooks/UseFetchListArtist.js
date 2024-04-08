import { useState, useEffect } from 'react';
import { getListArtist } from '../helpers';


export const UseFetchListArtist = () => {

    const [artist, setArtist] = useState({
        listArtist: [],
    });

    useEffect(() => {

        getListArtist()
        .then(artistData => {
            setArtist({
                listArtist: artistData, 
            });
        })


    }, [artist])


    return artist;
}
