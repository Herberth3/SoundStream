import React from 'react'
import { Box } from '@mui/material'
import { CardSong } from './CardSong'

export const ListSong = ({ setPlayer, listArtist, listSong }) => {

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
                listSong.map((song) => (
                    <CardSong key={song.id_cancion} listArtist={listArtist} setPlayer={setPlayer} song={song} />
                ))
            }

        </Box>
    )
}
