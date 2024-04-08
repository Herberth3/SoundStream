import { API_LOCAL_URL, ENPOINT_GET_USER } from '../../env';

export const getProfile = async (user) => {

    const credentials = {
        email: user.data.correo,
    };

    const url = API_LOCAL_URL + ENPOINT_GET_USER;

    const resp = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials)

    }).catch((error) => {
        console.log(error);
        return;
    });

    const data = await resp.json();

    const dataUser = data.content.map((dataInfo) => {
        return {
            status: 200,
            data: dataInfo
        }
    })

    return dataUser[0];
}
