import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { StyledTableCell, StyledTableRow } from '../style';

import { getListSongPlaylist, playSongPlaylist } from './helpers';




export const DetailsPlaylist = ({ setPlayer, listPlaylistUser, listSong, listArtist }) => {

    //id de la playlist seleccionada.
    const [idPlaylist, setIdPlaylist] = useState(-1);


    //Lista de canciones de una playList.
    const [listSongPlaylist, setListSongPlaylist] = useState([]);


    //Obtener artista por ID.
    const getArtist = (id) => {
        const artistName = listArtist.find(artist => artist.id_artista === id);

        if (artistName) {
            return artistName.nombre;
        }
        return null;
    }


    //Ver las canciones de la playlist
    const handleSongPlayList = (data) => {

        //Actualizar el id de la playlist.
        setIdPlaylist(data.id_playlist);

        //Limpiar la lista de canciones del album.
        setListSongPlaylist([]);

        //Obtener canciones del album.
        getListSongPlaylist(data.id_playlist, setListSongPlaylist, listSong);
    }


    // Reproducir la playlist completa.
    const handlePlayPlaylist = (data) => {

        //Reproducir canciónes de la playlist.
        playSongPlaylist(data.id_playlist, setPlayer, listSong, listArtist)
    }


    //Reproducir la cancion.
    const handlePlaySong = (data) => {
        const songPlay = {
            name: data.nombre,
            artist: getArtist(data.id_artista),
            src: data.mp3
        }
        setPlayer([songPlay]);
    }


    return (

        <Box sx={{ display: 'flex' }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 500, width: 570, backgroundColor: '#121212', margin: 2, marginLeft: 3, border: '1px solid #FFF', borderRadius: '10px', }}>

                <Box sx={{ height: '98%', width: '98%', overflow: 'auto', }}>

                    <TableContainer component={Paper}>

                        <Table aria-label="customized table">

                            <TableHead>
                                <TableRow sx={{ width: '100%' }}>
                                    <StyledTableCell>PlayList</StyledTableCell>
                                    <StyledTableCell align="center">Descripción</StyledTableCell>
                                    <StyledTableCell align="center"> Ver </StyledTableCell>
                                    <StyledTableCell align="center"> Play </StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    listPlaylistUser.map((row) => (
                                        <StyledTableRow key={row.id_playlist}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.nombre}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row.descripcion}</StyledTableCell>

                                            <StyledTableCell align="center">
                                                <Button
                                                    sx={{
                                                        backgroundColor: '#CE93D8',
                                                        color: '#000',
                                                        '&:hover': {
                                                            backgroundColor: '#CE93D8',
                                                        },
                                                    }}
                                                    onClick={() => handleSongPlayList(row)}
                                                >

                                                    <RemoveRedEyeIcon fontSize="small" />

                                                </Button>
                                            </StyledTableCell>

                                            <StyledTableCell align="center">
                                                <Button
                                                    sx={{
                                                        backgroundColor: '#CE93D8',
                                                        color: '#000',
                                                        '&:hover': {
                                                            backgroundColor: '#CE93D8',
                                                        },
                                                    }}
                                                    onClick={() => handlePlayPlaylist(row)}
                                                >

                                                    <PlayArrowIcon fontSize="small" />

                                                </Button>
                                            </StyledTableCell>

                                        </StyledTableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>

            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 500, width: 800, backgroundColor: '#121212', margin: 2, border: '1px solid #FFF', borderRadius: '10px', }}>


                <Box sx={{ margin: 1, height: '100%', width: '100%', overflow: 'auto', }}>

                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">

                            <TableHead>
                                <TableRow sx={{ width: '100%' }}>
                                    <StyledTableCell>Canción en Playlist</StyledTableCell>
                                    <StyledTableCell align="center">Artista</StyledTableCell>
                                    <StyledTableCell align="center">Duración</StyledTableCell>
                                    <StyledTableCell align="center"> Play </StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    listSongPlaylist.map((row) => (
                                        <StyledTableRow key={row.id_cancion}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.nombre}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{getArtist(row.id_artista)}</StyledTableCell>
                                            <StyledTableCell align="center">{row.duracion}</StyledTableCell>

                                            <StyledTableCell align="center">
                                                <Button
                                                    sx={{
                                                        backgroundColor: '#CE93D8',
                                                        color: '#000',
                                                        '&:hover': {
                                                            backgroundColor: '#CE93D8',
                                                        },
                                                    }}
                                                    onClick={() => handlePlaySong(row)}
                                                >

                                                    <PlayArrowIcon fontSize="small" />

                                                </Button>
                                            </StyledTableCell>

                                        </StyledTableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>

            </Box>

        </Box>
    )
}
