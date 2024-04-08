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
import { editAlbum, deleteAlbum } from './helpers';





export const ManageAlbum = ({ profile, listArtist, listAlbum }) => {

    //estado par el id del album.
    const [idAlbum, setIdAlbum] = useState(-1);

    // Estado para la foto.
    const [photo, setPhoto] = useState({
        profile: '',
        base64: '',
        name: '',
    });


    // Custom Hook para el formulario.
    const { form, setForm, handleChange, handleReset } = useForm({
        nombre: '',
        artista: '',
        idArtista: '',
        descripcion: '',
        contrasenia: '',
    });


    //Obtener artista por ID.
    const getArtist = (id) => {
        const artistName = listArtist.find(artist => artist.id_artista === id);

        if (artistName) {
            return artistName.nombre;
        }

        return null;
    }


    // Funcion para cancelar.
    const handleCancel = () => {

        setPhoto({
            profile: '',
            base64: '',
            name: '',
        });

        setIdAlbum(-1);

        handleReset();
    }


    // Funcion para editar.
    const handleEdit = (data) => {

        setIdAlbum(data.id_album);

        setForm({
            ...form,
            nombre: data.nombre,
            artista: getArtist(data.id_artista),
            idArtista: data.id_artista,
            descripcion: data.descripcion,
        });

        //Poner la foto de perfil en el avatar.
        setPhoto({
            ...photo,
            profile: data.foto,
        });
    }


    // Funcion para eliminar.
    const handleDelete = (data) => {

        if (form.contrasenia === '') {
            alert('Debe ingresar la contraseña para eliminar');
            return;
        }

        //Llamar endpoint eliminar.
        deleteAlbum(data.id_album, form.contrasenia);
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


    // Funcion Actualizar Artista.
    const handleSubmit = (e) => {
        e.preventDefault(); //evita el recargo de la pagina.

        if (photo.profile === '') {
            alert('Debe cargar una foto');
            return;
        }

        //Actualizar album.
        editAlbum(form, photo, idAlbum)

        setPhoto({
            profile: '',
            base64: '',
            name: '',
        });

        setIdAlbum(-1);

        handleReset();
    }


    return (
        <Box sx={{ display: 'flex' }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 500, width: 600, backgroundColor: '#121212', margin: 2, border: '1px solid #FFF', borderRadius: '10px', }}>

                <Box sx={{ display: 'flex', justifyContent: 'center', width: 150, height: 150, }}>
                    <Avatar variant="square"
                        sx={{ width: 150, height: 150 }}
                        src={photo.profile === '' ? profile : photo.profile}
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', width: 520, height: 275, marginTop: 3, }}>

                    <form onSubmit={handleSubmit}>

                        <Box sx={{ display: 'flex' }}>
                            <CssTextField label="Nombre Álbum"
                                sx={{ m: 1, width: '20ch', marginTop: 2 }}
                                required
                                name='nombre'
                                value={form.nombre}
                                onChange={handleChange}
                            />

                            <CssTextField
                                sx={{ m: 1, width: '20ch', marginTop: 2 }}
                                required
                                label="Nombre Artista"
                                name='artista'
                                value={form.artista}
                                onChange={handleChange}
                            />

                            <CssTextField
                                sx={{ m: 1, width: '15ch', marginTop: 2 }}
                                required
                                label="ID Artista"
                                name='idArtista'
                                value={form.idArtista}
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
                                    width: '22ch',
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
                                variant="contained"
                                type="submit"
                                sx={{
                                    m: 1,
                                    marginTop: 4,
                                    width: '25ch',
                                    height: '6ch',
                                    marginLeft: 9,
                                    backgroundColor: '#CE93D8',
                                    '&:hover': {
                                        backgroundColor: '#CE93D8',
                                    },
                                }}
                            >
                                Guardar Cambios
                            </Button>


                            <Button
                                variant="contained"
                                sx={{
                                    m: 1,
                                    marginTop: 4,
                                    width: '22ch',
                                    height: '6ch',
                                    marginLeft: 1,
                                    backgroundColor: '#CE93D8',
                                    '&:hover': {
                                        backgroundColor: '#CE93D8',
                                    },
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

                <Box sx={{ display: 'flex', marginTop: 3, }}>

                    <CssTextField
                        sx={{ m: 1, width: '25ch', }}
                        label="Contraseña"
                        type='password'
                        name='contrasenia'
                        value={form.contrasenia}
                        onChange={handleChange}

                    />

                </Box>

                <Box sx={{ margin: 2, height: 360, width: '95%', overflow: 'auto', }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow sx={{ width: '100%' }}>
                                    <StyledTableCell>Álbum</StyledTableCell>
                                    <StyledTableCell align="center">Artista</StyledTableCell>
                                    <StyledTableCell align="center">Descripción</StyledTableCell>
                                    <StyledTableCell align="center"> Editar </StyledTableCell>
                                    <StyledTableCell align="center"> Eliminar </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listAlbum.map((row) => (
                                    <StyledTableRow key={row.id_album}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.nombre}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{getArtist(row.id_artista)}</StyledTableCell>
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
                                                }}
                                                onClick={() => handleDelete(row)}
                                            >

                                                <DeleteForeverIcon fontSize="small" />

                                            </Button>
                                        </StyledTableCell>

                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    )
}
