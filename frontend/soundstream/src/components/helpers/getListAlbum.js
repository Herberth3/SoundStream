import { API_LOCAL_URL, ENPOINT_LISTA_ALBUM } from '../../env';

export const getListAlbum = async() => {

    const url = API_LOCAL_URL + ENPOINT_LISTA_ALBUM;

    const resp = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await resp.json();

    return data.content;
}
