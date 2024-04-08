import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Avatar, Box, Button } from '@mui/material';
import { CssTextField } from '../style/';
import { useForm } from '../hooks/useForm';
import { setPlaylist } from './helpers/setPlaylist';


export const CreatePlaylist = ({ profile, user }) => {

    // Custom Hook para el formulario.
    const { form, handleChange, handleReset } = useForm({
        nombre: '',
        descripcion: '',
    });


    // Estado para la foto.
    const [photo, setPhoto] = useState({
        profile: '',
        base64: '',
        name: '',
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


    //Funcion para cancelar.
    const handleCancel = () => {

        setPhoto({
            profile: '',
            base64: '',
            name: '',
        })

        handleReset();
    }


    // Funcion Crear Artista.
    const handleSubmit = (e) => {

        e.preventDefault(); //evita el recargo de la pagina

        if (photo.profile === '') {
            alert('Debe cargar una foto');
            return;
        }

        //Peticion al backend.
        setPlaylist(form, photo, user); // Crear nuevo artista.

        setPhoto({
            profile: '',
            base64: '',
            name: '',
        });

        handleReset();
    }


    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

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
                                    onChange={handleFile}
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
                                Crear Playlist
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

        </Box >
    )
}
