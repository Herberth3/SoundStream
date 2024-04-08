import { API_LOCAL_URL, ENPOINT_LIST_PLAYLIST_USER } from '../../env';

export const getPlayListUser = async (user) => {

    const url = API_LOCAL_URL + ENPOINT_LIST_PLAYLIST_USER;

    const idUser = {
        id_usuario: user.data.id_usuario
    }

    const resp = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(idUser)
    });

    const data = await resp.json();
    const status = resp.status;

    if (status === 200) {
        return data.content;
    } else {
        return []
    }
}
