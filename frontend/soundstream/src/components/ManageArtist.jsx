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


// ------------ HELPERS ------------
import { editArtist, deleteArtist } from './helpers';



export const ManageArtist = ({ profile, listArtist }) => {


    // Estado para el nombre.
    const [nombre, setNombre] = useState('');


    // Estado para el id artista.
    const [idArtista, setIdArtista] = useState(-1);


    // Estado para la foto.
    const [photo, setPhoto] = useState({
        profile: '',
        base64: '',
        name: '',
    });


    // Custom Hook para actualizar.
    const { form, setForm, handleChange, handleReset } = useForm({
        nombre: '',
        contrasenia: '',
        fecha: '',
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


    //Funcion para editar.
    const handleEdit = (data) => {

        setIdArtista(data.id_artista);

        //Poner el nombre del artista en el estado.
        setNombre(data.nombre);

        //Poner los datos en el formulario.
        setForm({
            ...form,
            nombre: data.nombre,
            fecha: formatearFecha(data.fecha_nac),
        });


        //Poner la foto de perfil en el avatar.
        setPhoto({
            ...photo,
            profile: data.foto,
        });
    }


    //Funcion para eliminar.
    const handleDelete = (data) => {

        if (form.contrasenia === '') {
            alert('Debe ingresar la contraseña para eliminar');
            return;
        }

        //Llamar endpoint eliminar.
        deleteArtist(data, form.contrasenia);
        handleReset();
    }


    //Funcion para cancelar.
    const handleCancel = () => {

        setPhoto({
            profile: '',
            base64: '',
            name: '',
        })
        
        handleReset();

        setIdArtista('-1');
    }


    //Funcion para manejar fotos de perfil y convertir a base 64.
    const handleFile = (e) => {
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

        // Validar campos.
        if (photo.profile === '') {
            alert('Debe cargar una foto');
            return;
        }

        //Llamar endpoint actualizar.
        editArtist(nombre, form, photo, idArtista);

        // Resetear formulario.
        handleReset();

        // Resetear nombre.
        setNombre('');

        // Resetear formulario.
        setPhoto({
            profile: '',
            base64: '',
            name: '',
        });

        setIdArtista('-1');
    }


    return (
        <Box sx={{ display: 'flex' }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 500, width: 600, backgroundColor: '#121212', margin: 2, border: '1px solid #FFF', borderRadius: '10px', }}>

                <Box sx={{ display: 'flex', justifyContent: 'center', width: 150, height: 150, }}>
                    <Avatar
                        sx={{ width: 150, height: 150 }}
                        src={photo.profile === '' ? profile : photo.profile}
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', width: 400, height: 255, marginTop: 3, }}>

                    <form onSubmit={handleSubmit}>

                        <Box sx={{ display: 'flex' }}>

                            <CssTextField label="Nombre Artistico"
                                sx={{ m: 1, width: '20ch', marginTop: 2 }}
                                required
                                name='nombre'
                                value={form.nombre}
                                onChange={handleChange}
                            />

                            <CssTextField
                                sx={{ m: 1, width: '20ch', marginTop: 2 }}
                                required
                                label="DD/MM/YYYY"
                                name='fecha'
                                value={form.fecha}
                                onChange={handleChange}
                            />

                        </Box>

                        <Box sx={{ display: 'flex' }}>
                            <Button
                                component="label"
                                title="..."
                                sx={{
                                    m: 1,
                                    width: '24ch', height: '6ch',
                                    backgroundColor: '#CE93D8',
                                    marginTop: 1,
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
                                    onChange={handleFile}
                                />
                            </Button>

                            <Button
                                sx={{
                                    m: 1.5,
                                    width: '25ch', height: '6ch',
                                    color: '#FFF',
                                    backgroundColor: '#CE93D8',
                                    marginTop: 1,
                                    '&:hover': { backgroundColor: '#CE93D8', },
                                }}
                                onClick={handleCancel}
                            >
                                Cancelar
                            </Button>
                        </Box>


                        <Button variant="contained"
                            type='submit'
                            sx={{
                                m: 1,
                                marginTop: 1,
                                width: '25ch',
                                height: '6ch',
                                marginLeft: 12,
                                backgroundColor: '#CE93D8',
                                '&:hover': {
                                    backgroundColor: '#CE93D8',
                                },
                            }}
                        >
                            Guardar Cambios
                        </Button>

                    </form>

                </Box>

            </Box>


            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 500, width: 750, backgroundColor: '#121212', margin: 2, border: '1px solid #FFF', borderRadius: '10px', }}>

                <Box sx={{ display: 'flex', marginTop: 3, }}>

                    <CssTextField
                        sx={{ m: 1, width: '25ch', }}
                        type='password'
                        label="Contraseña"
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
                                    <StyledTableCell>Nombre</StyledTableCell>
                                    <StyledTableCell align="center">Fecha Nacimiento</StyledTableCell>
                                    <StyledTableCell align="center"> Editar </StyledTableCell>
                                    <StyledTableCell align="center"> Eliminar </StyledTableCell>
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
