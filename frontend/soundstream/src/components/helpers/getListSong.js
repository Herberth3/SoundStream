import { API_LOCAL_URL, ENPOINT_LISTA_CANCION } from '../../env'

export const getListSong = async() => {

    const url = API_LOCAL_URL + ENPOINT_LISTA_CANCION;

    const resp = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await resp.json(); // obtener los datos
    return data.content;

}
