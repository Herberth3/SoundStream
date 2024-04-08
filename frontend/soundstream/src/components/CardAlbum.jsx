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
import { getPlaySongAlbum } from './helpers';


export const CardAlbum = ({ setPlayer, listArtist, listSong, album }) => {


    //Obtener artista por ID.
    const getArtist = (id) => {

        const artistName = listArtist.find(artist => artist.id_artista === id);

        if (artistName) {
            return artistName.nombre;
        }

        return null;
    }


    //Reproducir canción.
    const handlePlay = async () => {

        //Obtener canciones del album.
        const ListsongId = await getPlaySongAlbum(album.id_album);

        const songPlay = ListsongId.map(songId => {

            const song = listSong.find(songData => songData.id_cancion === songId.id_cancion);

            return {
                name: song.nombre,
                artist: getArtist(song.id_artista),
                src: song.mp3
            }
        });
        
        setPlayer(songPlay);
    }


    return (
        <Card sx={{ display: 'flex', width: 400, height: 200, m: 1 }}>
            <Box sx={{ display: 'flex', paddingBottom: 1, flexDirection: 'column', backgroundColor: '#000', width: '100%' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h7" color={grey[50]}>
                        {album.nombre}
                    </Typography>
                    <Typography sx={{ marginTop: 1 }} variant="subtitle2" component="div" color={grey[50]}>
                        {getArtist(album.id_artista)} • Álbum
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
                image={album.foto}
                alt="Live from space album cover"
            />
        </Card >
    )
}
