import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/material';
import { playSongPlaylist } from './helpers';

export const CardPlaylist = ({ setPlayer, listArtist, listSong, playList }) => {

    //Reproducir canción.
    const handlePlay = async () => {

        //Reproducir canciónes de la playlist.
        playSongPlaylist(playList.id_playlist, setPlayer, listSong, listArtist)

    }


    return (
        <Card sx={{ display: 'flex', width: 400, height: 200, m: 1 }}>

            <Box sx={{ display: 'flex', paddingBottom: 1, flexDirection: 'column', backgroundColor: '#000', width: '100%' }}>

                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h7" color={grey[50]}>
                        {playList.nombre}
                    </Typography>
                    <Typography sx={{ marginTop: 1 }} variant="subtitle2" component="div" color={grey[50]}>
                        {playList.descripcion}
                    </Typography>
                </CardContent>

                <Box sx={{ display: 'flex', }}>
                    <IconButton
                        aria-label="play/pause"
                        sx={{ marginLeft: 1, backgroundColor: grey[200], '&:hover': { backgroundColor: '#CE93D8', }, }}
                        onClick={handlePlay}
                    >

                        <PlayArrowIcon sx={{ height: 28, width: 28, }} />

                    </IconButton>

                    <IconButton
                        aria-label="play/pause"
                        sx={{ marginLeft: 1, '&:hover': { backgroundColor: '#ef5350', }, }}
                    >

                        <FavoriteBorderIcon
                            sx={{
                                height: 27,
                                width: 23,
                                color: 'white'
                            }}
                        />

                    </IconButton>

                </Box>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 160 }}
                image={playList.foto}
                alt="Live from space album cover"
            />
        </Card >
    )
}
