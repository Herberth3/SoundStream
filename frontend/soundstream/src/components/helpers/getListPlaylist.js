import { API_LOCAL_URL, ENPOINT_LISTA_PLAYLIST } from '../../env'

export const getListPlaylist = async () => {

    const url = API_LOCAL_URL + ENPOINT_LISTA_PLAYLIST;

    const resp = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await resp.json(); // obtener los datos
    return data.content; // retornar los datos.
}
