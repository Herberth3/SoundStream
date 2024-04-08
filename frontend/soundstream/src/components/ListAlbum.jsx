import React from 'react';
import { Box } from '@mui/material';
import { CardAlbum } from './CardAlbum';

export const ListAlbum = ({ setPlayer, listArtist, listSong, listAlbum }) => {
    return (
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
                listAlbum.map((album) => (
                    <CardAlbum key={album.id_album} setPlayer={setPlayer} listArtist={listArtist} listSong={listSong} album={album} />
                ))
            }

        </Box>
    )
}
