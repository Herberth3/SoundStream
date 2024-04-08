import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Box, TextField, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useForm } from '../hooks/useForm';
import { verifyProfile } from './helpers';
import { UseFetchProfile } from './hooks';

// import imgConfig from '../assets/slider';


//Color personalizado para el TextField.
const CssTextField = styled(TextField)({
    '& label': {
        color: '#FFFFFF',
    },
    '& label.Mui-focused': {
        color: '#CE93D8',
    },
    '& input': {
        color: '#FFFFFF',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#CE93D8',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#FFFFFF',
        },
        '&:hover fieldset': {
            borderColor: '#CE93D8',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#CE93D8',
        },
    },
});



export const Profile = (props) => {

    //Control del cambio de datos del usuraio
    const { user, setUser } = props;

    //Estado para el cambio de datos.
    const [changeProfile, setChangeProfile] = useState(false);


    //Efecto para verificar si se cambio el perfil.
    useEffect(() => {
        
        if (changeProfile) {
            UseFetchProfile(user, setUser); //Actualizar datos frontend
            setChangeProfile(false); //Reiniciar estado.
        }

    }, [changeProfile, user, setUser]);


    // Estado para la foto.
    const [photo, setPhoto] = useState({
        profile: '',
        base64: '',
        name: '',
    })


    // Custom Hook para el formulario.
    const { form, handleChange } = useForm({
        nombre: user.data.nombres,
        apellido: user.data.apellidos,
        email: user.data.correo,
        contra: ''
    });


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


    // Funcion para manejar el submit del formulario.
    const handleSubmit = (e) => {
        e.preventDefault(); //Evitar que se recargue la pagina.

        verifyProfile(form, user, photo, setChangeProfile); //Actualizar datos en la base de datos.

        setPhoto({ //Reiniciar estado de la foto.
            profile: '',
            base64: '',
            name: '',
        });

    }


    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#212121',
                    display: 'flex',
                    height: 680,
                    justifyContent: 'center',
                    paddingTop: 10,
                    width: '100%',
                }}
            >
                <Box sx={{ display: 'flex', height: 400, width: 1000, backgroundColor: '#121212', border: '1px solid #FFF', borderRadius: '10px', }}>

                    <Box sx={{ display: 'flex', justifyContent: 'center', width: 500, height: 400, marginTop: 6, }}>
                        <Avatar
                            sx={{ width: 210, height: 210, marginTop: 4 }}
                            src={photo.profile === '' ? user.data.foto : photo.profile}
                        />
                    </Box >

                    <Box noValidate autoComplete="off" sx={{ width: 500, height: 300, marginTop: 6, }}>

                        <form onSubmit={handleSubmit}>

                            <CssTextField
                                sx={{ m: 1, width: '25ch' }}
                                label="Nombre"
                                required
                                name='nombre'
                                value={form.nombre}
                                onChange={handleChange}
                            />

                            <CssTextField
                                sx={{ m: 1, width: '25ch' }}
                                label="Apellido"
                                required
                                name='apellido'
                                value={form.apellido}
                                onChange={handleChange}
                            />

                            <CssTextField
                                sx={{ m: 1, width: '52ch' }}
                                label="E-Mail"
                                required
                                name='email'
                                value={form.email}
                                onChange={handleChange}
                            />

                            <CssTextField
                                sx={{ m: 1, width: '25ch' }}
                                label="Contraseña"
                                required
                                name='contra'
                                value={form.contra}
                                onChange={handleChange}
                            />

                            <Button
                                component="label"
                                title="..."
                                sx={{
                                    m: 1.5,
                                    width: '25ch', height: '6ch',
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
                                Guardar cambios
                            </Button>

                        </form>

                    </Box >

                </Box>

            </Box >

        </>
    )
}
