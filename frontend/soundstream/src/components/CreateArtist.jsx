import React, { useState } from 'react';
import { Avatar, Box, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { CssTextField } from '../style/';
import { useForm } from '../hooks/useForm';
import { setArtist } from './helpers';


export const CreateArtist = ({profile}) => {

    // Estado para la foto.
    const [photo, setPhoto] = useState({
        profile: '',
        base64: '',
        name: '',
    });


    // Custom Hook para el formulario.
    const { form, handleChange, handleReset } = useForm({
        nombre: '',
        dia: '',
        mes: '',
        anio: ''
    });


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


    // Funcion Crear Artista.
    const handleSubmit = (e) => {

        e.preventDefault(); //evita el recargo de la pagina

        if (photo.profile === '') {
            alert('Debe cargar una foto');
            return;
        }

        setArtist(form, photo); // Crear nuevo artista.

        // Resetear formulario.
        setPhoto({
            profile: '',
            base64: '',
            name: '',
        });

        // Resetear formulario.
        handleReset();
    }


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', }}>
            <Box sx={{ display: 'flex', height: 400, width: 1000, backgroundColor: '#121212', marginTop: 7, border: '1px solid #FFF', borderRadius: '10px', }}>

                <Box sx={{ display: 'flex', justifyContent: 'center', width: 500, height: 400, marginTop: 6, }}>
                    <Avatar
                        sx={{ width: 210, height: 210, marginTop: 4 }}
                        src={photo.profile === '' ? profile : photo.profile}
                    // src={profile}
                    />
                </Box >


                <Box noValidate autoComplete="off" sx={{ width: 500, height: 300, marginTop: 6, }}>

                    <form onSubmit={handleSubmit} >

                        <CssTextField
                            sx={{ m: 1, width: '25ch', marginTop: 6 }}
                            required
                            label="Nombre Artistico"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                        />

                        <Button
                            sx={{
                                m: 1.5,
                                width: '25ch', height: '6ch',
                                backgroundColor: '#CE93D8',
                                marginTop: 6.5,
                                '&:hover': { backgroundColor: '#CE93D8', },
                            }}
                            startIcon={<CloudUploadIcon />}
                            component="label"
                            variant="contained"
                        // href="#file-upload"
                        >
                            {photo.profile === '' ? 'Cargar Foto' : 'Foto Cargada*'}
                            <input
                                style={{ display: 'none' }} // Para ocultar el input por defecto
                                type="file"
                                accept="image/*" // Aquí especifica las extensiones permitidas
                                onChange={handleFile}
                            />
                        </Button>

                        <CssTextField
                            sx={{ m: 1, width: '13ch' }}
                            required
                            label="Dia"
                            name="dia"
                            value={form.dia}
                            onChange={handleChange}
                        />

                        <CssTextField
                            sx={{ m: 1, width: '20ch' }}
                            required
                            label="Mes"
                            name="mes"
                            value={form.mes}
                            onChange={handleChange}
                        />

                        <CssTextField
                            sx={{ m: 1, width: '13ch' }}
                            required
                            label="Año"
                            name="anio"
                            value={form.anio}
                            onChange={handleChange}
                        />

                        <Button variant="contained" type="submit"
                            sx={{
                                m: 1,
                                marginLeft: 12,
                                marginTop: 3,
                                width: '35ch',
                                height: '6ch',
                                backgroundColor: '#CE93D8',
                                '&:hover': {
                                    backgroundColor: '#CE93D8',
                                },
                            }}
                        >
                            Crear Artista
                        </Button>

                    </form>

                </Box >

            </Box>

        </Box>
    );
}
