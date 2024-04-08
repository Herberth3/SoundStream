import { API_LOCAL_URL, ENPOINT_CREAR_PLAYLIST } from '../../../env';

export const setFavorite = async (user) => {

    const url = API_LOCAL_URL + ENPOINT_CREAR_PLAYLIST;

    const newPlaylist = {
        id_usuario: user.id_usario,
        nombre: 'Favoritos',
        descrip: 'Mis canciones favoritas',
        nombreFoto: '',
        foto: '',
    };


    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPlaylist)
    });

}
