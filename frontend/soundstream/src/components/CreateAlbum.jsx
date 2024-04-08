import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, Box, Button } from '@mui/material';
import { CssTextField, StyledTableCell, StyledTableRow } from '../style/';
import { useForm } from '../hooks/useForm';
import { setAlbum } from './helpers/';



export const CreateAlbum = ({ profile, listArtist }) => {

    // Estado para la foto.
    const [photo, setPhoto] = useState({
        profile: '',
        base64: '',
        name: '',
    })


    // Custom Hook para el formulario.
    const { form, setForm, handleChange, handleReset } = useForm({
        nombre: '',
        artista: '',
        idArtista: '',
        descripcion: '',
    });


    //funcion formato fecha
    const formatearFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        const anio = fecha.getFullYear();
        const mes = fecha.getMonth() + 1;
        const dia = fecha.getDate();

        const formatoMes = mes < 10 ? `0${mes}` : mes;
        const formatoDia = dia < 10 ? `0${dia}` : dia;

        return `${anio} - ${formatoMes} - ${formatoDia}`;
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


    // Funcion para cancelar.
    const handleCancel = () => {

        setPhoto({
            profile: '',
            base64: '',
            name: '',
        });

        handleReset();
    }


    // Funcion para agregar artista al formulario.
    const handleAdd = (data) => {
        setForm({
            ...form,
            artista: data.nombre,
            idArtista: data.id_artista,
        })
    }


    // Funcion Crear album.
    const handleSubmit = (e) => {
        e.preventDefault(); //evita el recargo de la pagina

        if (photo.profile === '') {
            alert('Por favor, cargue una foto.');
            return;
        }

        //Petición POST para crear un album.
        setAlbum(form, photo);

        handleReset();
        
        setPhoto({
            profile: '',
            base64: '',
            name: '',
        });
    }


    return (
        <Box sx={{ display: 'flex' }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 500, width: 600, backgroundColor: '#121212', margin: 2, border: '1px solid #FFF', borderRadius: '10px', }}>

                <Box sx={{ display: 'flex', justifyContent: 'center', width: 150, height: 150, }}>
                    <Avatar
                        sx={{ width: 150, height: 150 }}
                        src={photo.profile === '' ? profile : photo.profile}
                        variant="square"
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
                                Crear Álbum
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
                <Box sx={{ margin: 2, height: 460, width: '95%', overflow: 'auto', }}>

                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow sx={{ width: '100%' }}>
                                    <StyledTableCell>Artista</StyledTableCell>
                                    <StyledTableCell align="center">Fecha Nacimiento</StyledTableCell>
                                    <StyledTableCell align="center"> Agregar </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listArtist.map((row) => (
                                    <StyledTableRow key={row.id_artista}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.nombre}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{formatearFecha(row.fecha_nac)}</StyledTableCell>

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

            </Box>

        </Box>
    );
}
