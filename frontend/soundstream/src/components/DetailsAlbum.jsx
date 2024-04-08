import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from '../style/';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, Button } from '@mui/material';
import { getListSongAlbum } from './helpers';




export const DetailsAlbum = ({ listAlbum, listArtist, listSong }) => {

    //Lista de canciones de un album.
    const [listSongAlbum, setListSongAlbum] = useState([]);

    //Nombre del artista.
    const [artistSong, setArtistSong] = useState('');


    //Obtener artista por ID.
    const getArtist = (id) => {

        const artistName = listArtist.find(artist => artist.id_artista === id);

        if (artistName) {
            return artistName.nombre;
        }

        return null;
    }


    //Obtener Cancion por ID.
    const getSongData = (id) => {

        const songData = listSong.find(song => song.id_cancion === id);

        if (songData) {
            return songData;
        }

        return null;
    }


    //Manejar la tabla de albumes.
    const handleSongAlbum = (data) => {

        //Obtener nombre del artista.
        setArtistSong(getArtist(data.id_artista));

        //Limpiar la lista de canciones del album.
        setListSongAlbum([]);

        //Obtener canciones del album.
        getListSongAlbum(data.id_album, setListSongAlbum,);

    }


    return (

        <Box sx={{ display: 'flex' }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 500, width: 600, backgroundColor: '#121212', margin: 2, marginLeft: 3, border: '1px solid #FFF', borderRadius: '10px', }}>

                <Box sx={{ height: 490, width: 590, overflow: 'auto', }}>

                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow sx={{ width: '100%' }}>
                                    <StyledTableCell>Álbum</StyledTableCell>
                                    <StyledTableCell align="center">Artista</StyledTableCell>
                                    <StyledTableCell align="center"> Seleccionar </StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    listAlbum.map((row) => (
                                        <StyledTableRow key={row.id_album}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.nombre}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{getArtist(row.id_artista)}</StyledTableCell>

                                            <StyledTableCell align="center">
                                                <Button
                                                    sx={{
                                                        backgroundColor: '#CE93D8',
                                                        color: '#000',
                                                        '&:hover': {
                                                            backgroundColor: '#CE93D8',
                                                        },
                                                    }}
                                                    onClick={() => handleSongAlbum(row)}
                                                >

                                                    <RemoveRedEyeIcon fontSize="small" />

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

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 500, width: 730, backgroundColor: '#121212', margin: 2, border: '1px solid #FFF', borderRadius: '10px', }}>

                <Box sx={{ height: 490, width: 720, overflow: 'auto', }}>

                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow sx={{ width: '100%' }}>
                                    <StyledTableCell>Cancion</StyledTableCell>
                                    <StyledTableCell align="center">Artista</StyledTableCell>
                                    <StyledTableCell align="center">Duración</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    listSongAlbum.map((row) => (
                                        <StyledTableRow key={row.id_cancion}>
                                            <StyledTableCell component="th" scope="row">
                                                {getSongData(row.id_cancion).nombre}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{artistSong}</StyledTableCell>
                                            <StyledTableCell align="center">{getSongData(row.id_cancion).duracion}</StyledTableCell>

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
