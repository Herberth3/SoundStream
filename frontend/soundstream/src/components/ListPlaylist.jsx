import React from 'react';
import { Box } from '@mui/material';
import { CardPlaylist } from './CardPlaylist';



export const ListPlaylist = ({ setPlayer, listArtist, listSong, listPlaylist }) => {
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
                listPlaylist.map((playList) => (
                    playList.nombre === 'Favoritos'
                        ?
                        null
                        :
                        < CardPlaylist key={playList.id_playlist} setPlayer={setPlayer} listArtist={listArtist} listSong={listSong} playList={playList} />
                ))
            }

        </Box>
    )
}
