import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useForm } from '../hooks/useForm';
import { Avatar, Box, Button } from '@mui/material';
import { CssTextField, StyledTableCell, StyledTableRow } from '../style/';

// ---------- HELPERS -----------
import { editSong, deleteSong } from './helpers';



export const ManageSong = ({ profile, listSong, listArtist }) => {

    // Estado para la foto.
    const [photo, setPhoto] = useState({
        profile: '',
        base64: '',
        name: '',
    })


    // Estado para la cancion.
    const [song, setSong] = useState({
        songProfile: '',
        base64: '',
        name: '',
    })


    //Estado para id canción.
    const [idSong, setIdSong] = useState(-1);


    // Custom Hook para el formulario.
    const { form, setForm, handleChange, handleReset } = useForm({
        nombre: '',
        artista: '',
        idArtista: '',
        duracion: '',
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


    // Funcion para manejar fotos de perfil y convertir a base 64.
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


    // Funcion para manejar canciones y convertir a base 64.
    const handleSong = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                if (reader.readyState === 2) {
                    const base64 = reader.result;
                    var arrayB64 = base64.split(',');
                    setSong({
                        songProfile: base64,
                        base64: arrayB64[1],
                        name: e.target.files[0].name,
                    });
                }
            }
        }
    }


    // Funcion para cancelar.
    const handleCancel = () => {
        setPhoto({
            profile: '',
            base64: '',
            name: '',
        });

        setSong({
            songProfile: '',
            base64: '',
            name: '',
        });

        setIdSong(-1);

        handleReset();

    }


    // Funcion para editar.
    const handleEdit = (data) => {

        setForm({
            ...form,
            nombre: data.nombre,
            artista: getArtist(data.id_artista),
            idArtista: data.id_artista,
            duracion: data.duracion,
        });


        // Poner la foto de perfil en el avatar.
        setPhoto({
            ...photo,
            profile: data.foto,
        });


        //Poner la cancion.
        setSong({
            ...song,
            songProfile: data.mp3,
        });


        //Poner el id de la cancion.
        setIdSong(data.id_cancion);

    }


    // Funcion para eliminar.
    const handleDelete = (data) => {

        if (form.contrasenia === '') {
            alert('Debe ingresar la contraseña para eliminar');
            return;
        }

        //Llamar endpoint eliminar.
        deleteSong(form.contrasenia, data.id_cancion);
    }



    // Funcion editar Cancion.
    const handleSubmit = (e) => {
        e.preventDefault(); //evita el recargo de la pagina

        if (photo.profile === '' || song.songProfile === '') {
            alert('Por favor, cargue una foto y una canción.');
            return;
        }

        //Petición POST para crear una canción.
        editSong(form, photo, song, idSong)

        // Resetear foto.
        setPhoto({
            profile: '',
            base64: '',
            name: '',
        });

        // Resetear .mp3
        setSong({
            songProfile: '',
            base64: '',
            name: '',
        });

        // Resetear id de la canción.
        setIdSong(-1);

        // Resetear formulario.
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

                    <form onSubmit={handleSubmit} >

                        <Box sx={{ display: 'flex' }}>

                            <CssTextField label="Nombre Canción"
                                sx={{ m: 1, width: '20ch', marginTop: 2 }}
                                required
                                name='nombre'
                                value={form.nombre}
                                onChange={handleChange}
                            />

                            <CssTextField
                                label="Nombre Artista"
                                sx={{ m: 1, width: '20ch', marginTop: 2 }}
                                required
                                name='artista'
                                value={form.artista}
                                onChange={handleChange}
                            />

                            <CssTextField
                                label="ID Artista"
                                sx={{ m: 1, width: '15ch', marginTop: 2 }}
                                required
                                disabled={false}
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
                                {photo.profile === '' ? 'Cargar Foto' : 'Cargada*'}
                                <input
                                    style={{ display: 'none' }} // Para ocultar el input por defecto
                                    type="file"
                                    accept="image/*" // Aquí especifica las extensiones permitidas
                                    onChange={handlePhoto}
                                />
                            </Button>

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
                                {song.songProfile === '' ? 'Subir .mp3' : 'MP3*'}
                                <input
                                    style={{ display: 'none' }} // Para ocultar el input por defecto
                                    type="file"
                                    accept=".mp3" // Aquí especifica las extensiones permitidas
                                    onChange={handleSong}
                                />
                            </Button>

                            <CssTextField label="Duración"
                                sx={{ m: 1, width: '15ch' }}
                                required
                                name='duracion'
                                value={form.duracion}
                                onChange={handleChange}

                            />
                        </Box>

                        <Box sx={{ display: 'flex' }}>

                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    m: 1,
                                    marginTop: 3,
                                    width: '25ch',
                                    height: '6ch',
                                    marginLeft: 8,
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
                                    marginTop: 3,
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
                                    <StyledTableCell>Nombre (Canción)</StyledTableCell>
                                    <StyledTableCell align="center">Artista</StyledTableCell>
                                    <StyledTableCell align="center">Duración</StyledTableCell>
                                    <StyledTableCell align="center"> Editar </StyledTableCell>
                                    <StyledTableCell align="center"> Eliminar </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listSong.map((row) => (
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
    );
}
