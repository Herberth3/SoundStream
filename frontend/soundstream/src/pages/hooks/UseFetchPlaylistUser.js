import { useState, useEffect } from 'react'
import { getPlayListUser } from '../helpers'

export const UseFetchPlaylistUser = (user) => {

    const [playList, setPlayList] = useState([{
        listPlaylistUser: []
    }]);


    useEffect(() => {
        getPlayListUser(user)
            .then((data) => {
                setPlayList({
                    listPlaylistUser: data
                })
            });
    }, [playList, user]);


    return playList;
}
