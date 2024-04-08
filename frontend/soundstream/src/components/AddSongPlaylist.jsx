import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from '../style/';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from '@mui/material';

import { getListSongPlaylist, addSongPlaylist, deleteSongPlaylist } from './helpers';


export const AddSongPlaylist = ({ listPlaylistUser, listSong, listArtist }) => {

    //id de la playlist seleccionada.
    const [idPlaylist, setIdPlaylist] = useState(-1);


    //Lista de canciones de una playList.
    const [listSongPlaylist, setListSongPlaylist] = useState([]);


    //Estado para actualizar la lista de canciones de la playlist.
    const [update, setUpdate] = useState({
        add: false,
        delete: false,
    });


    // Actualizar la lista de canciones del album.
    useEffect(() => {

        if (update.add) {

            //Limpiar la lista de canciones del album.
            setListSongPlaylist([]);

            //Obtener canciones del album.
            getListSongPlaylist(idPlaylist, setListSongPlaylist, listSong);

            //Actualizar el estado.
            setUpdate({
                ...update,
                add: false,
            });
        }


        if (update.delete) {

            //Limpiar la lista de canciones del album.
            setListSongPlaylist([]);

            //Obtener canciones del album.
            getListSongPlaylist(idPlaylist, setListSongPlaylist, listSong);

            //Actualizar el estado.
            setUpdate({
                ...update,
                delete: false,
            });
        }

    }, [update, setListSongPlaylist, idPlaylist, listSong])


    //Obtener artista por ID.
    const getArtist = (id) => {
        const artistName = listArtist.find(artist => artist.id_artista === id);

        if (artistName) {
            return artistName.nombre;
        }

        return null;
    }


    //Agregar cancion a playlist.
    const handleAdd = (data) => {

        addSongPlaylist(data.id_cancion, idPlaylist, setUpdate);
    }


    //Eliminar cancion de playlist.
    const handleDelete = (data) => {

        deleteSongPlaylist(data.id_cancion, idPlaylist, setUpdate)

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


    return (

        <Box sx={{ display: 'flex' }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 500, width: 520, backgroundColor: '#121212', margin: 2, marginLeft: 3, border: '1px solid #FFF', borderRadius: '10px', }}>

                <Box sx={{ height: 485, width: 515, overflow: 'auto', }}>

                    <TableContainer component={Paper}>

                        <Table aria-label="customized table">

                            <TableHead>
                                <TableRow sx={{ width: '100%' }}>
                                    <StyledTableCell>PlayList</StyledTableCell>
                                    <StyledTableCell align="center">Descripción</StyledTableCell>
                                    <StyledTableCell align="center"> Ver </StyledTableCell>
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
                                        </StyledTableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>

            </Box>


            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 500, width: 850, backgroundColor: '#121212', margin: 2, border: '1px solid #FFF', borderRadius: '10px', }}>


                <Box sx={{ margin: 1, height: 245, width: 820, overflow: 'auto', }}>

                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">

                            <TableHead>
                                <TableRow sx={{ width: '100%' }}>
                                    <StyledTableCell>Nombre (Canción)</StyledTableCell>
                                    <StyledTableCell align="center">Artista</StyledTableCell>
                                    <StyledTableCell align="center">Duración</StyledTableCell>
                                    <StyledTableCell align="center"> Agregar </StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    listSong.map((row) => (
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
                                                    onClick={() => handleAdd(row)}
                                                >

                                                    <AddIcon fontSize="small" />

                                                </Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>

                <Box sx={{ margin: 1, height: 210, width: 820, overflow: 'auto', }}>

                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">

                            <TableHead>
                                <TableRow sx={{ width: '100%' }}>
                                    <StyledTableCell>Canción en Playlist</StyledTableCell>
                                    <StyledTableCell align="center">Artista</StyledTableCell>
                                    <StyledTableCell align="center">Duración</StyledTableCell>
                                    <StyledTableCell align="center"> Eliminar </StyledTableCell>
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
                                                    onClick={() => handleDelete(row)}
                                                >

                                                    <RemoveIcon fontSize="small" />

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
