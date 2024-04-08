import { API_LOCAL_URL, ENPOINT_GET_LISTA_ARTISTA } from '../../env'

export const getListArtist = async() => {

    const url = API_LOCAL_URL + ENPOINT_GET_LISTA_ARTISTA;

    const resp = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await resp.json();

    return data.content;

}
