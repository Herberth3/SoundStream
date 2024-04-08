import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { CssTextField, StyledTableCell, StyledTableRow } from '../style/';
import { useForm } from '../hooks/useForm';
import { editPlayList, deletePlaylist } from './helpers';

export const ManagePlaylist = ({ profile, listPlaylistUser }) => {

    // Custom Hook para el formulario.
    const { form, setForm, handleChange, handleReset } = useForm({
        nombre: '',
        descripcion: '',
        id_playlist: '',
    });


    // Estado para la foto.
    const [photo, setPhoto] = useState({
        profile: '',
        base64: '',
        name: '',
    });


    // Funcion para cancelar.
    const handleCancel = () => {

        setPhoto({
            profile: '',
            base64: '',
            name: '',
        });


        handleReset();
    }


    // Funcion para editar.
    const handleEdit = (data) => {

        setForm({
            ...form,
            nombre: data.nombre,
            descripcion: data.descripcion,
            id_playlist: data.id_playlist,
        });

        //Poner la foto de perfil en el avatar.
        setPhoto({
            ...photo,
            profile: data.foto,
        });
    }


    // Funcion para eliminar.
    const handleDelete = (data) => {

        //Llamar endpoint eliminar.
        deletePlaylist(data.id_playlist)
    }


    //Funcion para manejar fotos de perfil y convertir a base 64.
    const handlePhoto = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                if (reader.readyState === 2) {
                    const base64 = reader.result;
                    var arrayB64 = base64.split(',');
                    setPhoto({
                        profile: base64,
                        base64: arrayB64[1],
                        name: e.target.files[0].name,
                    });
                }
            }
        }
    }


    // Funcion Actualizar Playlist.
    const handleSubmit = (e) => {
        e.preventDefault(); //evita el recargo de la pagina.

        if (photo.profile === '') {
            alert('Debe cargar una foto');
            return;
        }

        //Actualizar album.
        editPlayList(form, photo);

        setPhoto({
            profile: '',
            base64: '',
            name: '',
        });


        handleReset();
    }


    return (
        <Box sx={{ display: 'flex' }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 500, width: 600, backgroundColor: '#121212', margin: 2, border: '1px solid #FFF', borderRadius: '10px', }}>

                <Box sx={{ display: 'flex', justifyContent: 'center', width: 150, height: 150, }}>
                    <Avatar
                        sx={{ width: 150, height: 150 }}
                        variant="square"
                        src={photo.profile === '' ? profile : photo.profile}
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', width: 520, height: 275, marginTop: 3, }}>

                    <form onSubmit={handleSubmit}>

                        <Box sx={{ display: 'flex' }}>
                            <CssTextField label="Nombre Playlist"
                                sx={{ m: 1, width: '20ch', }}
                                required
                                name='nombre'
                                value={form.nombre}
                                onChange={handleChange}
                            />


                            <CssTextField
                                sx={{ m: 1, width: '35ch' }}
                                label="Descripción"
                                name='descripcion'
                                value={form.descripcion}
                                onChange={handleChange}
                            />
                        </Box>

                        <Box sx={{ display: 'flex' }}>

                            <Button
                                component="label"
                                title="..."
                                sx={{
                                    m: 1,
                                    marginTop: 1.5,
                                    marginLeft: 17,
                                    width: '30ch',
                                    height: '6ch',
                                    backgroundColor: '#CE93D8',
                                    '&:hover': { backgroundColor: '#CE93D8', },
                                }}
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                                href="#file-upload"
                            >
                                {photo.profile === '' ? 'Portada' : 'Cargada*'}
                                <input
                                    style={{ display: 'none' }} // Para ocultar el input por defecto
                                    type="file"
                                    accept="image/*" // Aquí especifica las extensiones permitidas
                                    onChange={handlePhoto}
                                />
                            </Button>

                        </Box>

                        <Box sx={{ display: 'flex' }}>

                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    m: 1,
                                    marginTop: 1.5,
                                    marginLeft: 5,
                                    width: '25ch',
                                    height: '6ch',
                                    backgroundColor: '#CE93D8',
                                    '&:hover': {
                                        backgroundColor: '#CE93D8',
                                    },
                                }}
                            >
                                Guardar Cambios
                            </Button>

                            <Button
                                sx={{
                                    m: 1,
                                    marginTop: 1.5,
                                    width: '25ch',
                                    height: '6ch',
                                    color: '#FFF',
                                    backgroundColor: '#CE93D8',
                                    '&:hover': { backgroundColor: '#CE93D8', },
                                }}
                                onClick={handleCancel}
                            >
                                Cancelar
                            </Button>

                        </Box>

                    </form>

                </Box>

            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 500, width: 750, backgroundColor: '#121212', margin: 2, border: '1px solid #FFF', borderRadius: '10px', }}>

                <Box sx={{ margin: 2, height: 360, width: '95%', overflow: 'auto', }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow sx={{ width: '100%' }}>
                                    <StyledTableCell>PlayList</StyledTableCell>
                                    <StyledTableCell align="center">Descripción</StyledTableCell>
                                    <StyledTableCell align="center"> Editar </StyledTableCell>
                                    <StyledTableCell align="center"> Eliminar </StyledTableCell>
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
                                                        display: row.nombre === 'Favoritos' ? 'none' : 'block',
                                                    }}

                                                    onClick={() => handleEdit(row)}
                                                >

                                                    <EditIcon fontSize="small" />

                                                </Button>
                                            </StyledTableCell>

                                            <StyledTableCell align="center" >
                                                <Button
                                                    sx={{
                                                        backgroundColor: '#CE93D8',
                                                        color: '#000',
                                                        '&:hover': {
                                                            backgroundColor: '#CE93D8',
                                                        },
                                                        display: row.nombre === 'Favoritos' ? 'none' : 'block',
                                                    }}
                                                    onClick={() => handleDelete(row)}
                                                >

                                                    <DeleteForeverIcon fontSize="small" />

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
