import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { StyledTableCell, StyledTableRow } from '../style/';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, Button } from '@mui/material';
import { getListSongArtist, getListSongAlbum, addSongAlbum, deleteSongAlbum } from './helpers';



export const AddSong = ({ listAlbum, listArtist, listSong }) => {

    //Lista de cancion de un artista.
    const [listSongArtist, setListSongArtist] = useState([]);


    //Lista de canciones de un album.
    const [listSongAlbum, setListSongAlbum] = useState([]);


    //Estado para actualizar la lista de canciones del album.
    const [update, setUpdate] = useState({
        add: false,
        delete: false,
    });


    //id del album.
    const [idAlbum, setIdAlbum] = useState(-1);


    //Nombre del artista.
    const [artistSong, setArtistSong] = useState('');


    //Actualizar la lista de canciones del album.
    useEffect(() => {

        if (update.add) {

            //Limpiar la lista de canciones del album.
            setListSongAlbum([]);

            //Obtener canciones del album.
            getListSongAlbum(idAlbum, setListSongAlbum);

            //Actualizar el estado.
            setUpdate({
                ...update,
                add: false,
            });
        }


        if (update.delete) {

            //Limpiar la lista de canciones del album.
            setListSongAlbum([]);

            //Obtener canciones del album.
            getListSongAlbum(idAlbum, setListSongAlbum);

            //Actualizar el estado.
            setUpdate({
                ...update,
                delete: false,
            });
        }

    }, [update, setListSongAlbum, idAlbum])



    //Obtener artista por ID.
    const getArtist = (id) => {
        // console.log(id);

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
    const handleAlbumTable = (data) => {

        // console.log(data);

        // Obtener nombre del artista.
        setArtistSong(getArtist(data.id_artista));

        // Obtener id del album.
        setIdAlbum(data.id_album);

        // Limpiar la lista de canciones del artista.
        setListSongArtist([]);

        // Obtener canciones del artista
        getListSongArtist(data.id_artista, setListSongArtist);

        //Limpiar la lista de canciones del album.
        setListSongAlbum([]);

        //Obtener canciones del album.
        getListSongAlbum(data.id_album, setListSongAlbum,);

    }


    //Agregar cancion al album.
    const handleAdd = (data) => {

        // Agregar cancion al album.
        addSongAlbum(data.id_cancion, idAlbum, setUpdate);

    }


    //Agregar cancion al album.
    const handleDelete = (data) => {

        //Eliminar cancion del album.
        deleteSongAlbum(data.id_cancion, idAlbum, setUpdate);

    }


    return (

        <Box sx={{ display: 'flex' }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 500, width: 520, backgroundColor: '#121212', margin: 2, marginLeft: 3, border: '1px solid #FFF', borderRadius: '10px', }}>

                <Box sx={{ height: 485, width: 515, overflow: 'auto', }}>

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
                                                    onClick={() => handleAlbumTable(row)}
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
                                    <StyledTableCell>Cancion</StyledTableCell>
                                    <StyledTableCell align="center">Artista</StyledTableCell>
                                    <StyledTableCell align="center">Duración</StyledTableCell>
                                    <StyledTableCell align="center"> Agregar </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listSongArtist.map((row) => (
                                    <StyledTableRow key={row.id_cancion}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.nombre}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{artistSong}</StyledTableCell>
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
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>

                <Box sx={{ margin: 1, height: 210, width: 820, overflow: 'auto', }}>

                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow sx={{ width: '100%' }}>
                                    <StyledTableCell>Cancion en Álbum</StyledTableCell>
                                    <StyledTableCell align="center">Artista</StyledTableCell>
                                    <StyledTableCell align="center">Duración</StyledTableCell>
                                    <StyledTableCell align="center"> Eliminar </StyledTableCell>
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