import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { getListSongPlaylist } from '../components/helpers';
import { CardSong } from '../components';



export const Favorite = ({ setPlayer, listArtist, listSong, getPlaylistFavorite }) => {

    const [listSongPlaylist, setListSongPlaylist] = useState([]);


    useEffect(() => {
        //Obtener canciones del la playlist.
        getListSongPlaylist(getPlaylistFavorite().id_playlist, setListSongPlaylist, listSong);
    }, [getPlaylistFavorite, listSong]);


    return (
        <Box sx={{ backgroundColor: '#212121', height: 680, width: '100%', }}>

            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: 545,
                overflowX: 'auto',
            }}>

                {
                    listSongPlaylist.map((song) => (
                        <CardSong key={song.id_cancion} listArtist={listArtist} setPlayer={setPlayer} song={song} />
                    ))
                }

            </Box>

        </Box>
    );

}
