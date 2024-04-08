import { API_LOCAL_URL, ENPOINT_LOGIN } from '../../../env'

export const setLogin = async (form) => {

    const user = {
        email: form.email,
        contra: form.password,
    };

    const url = API_LOCAL_URL + ENPOINT_LOGIN;

    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)

    });

    const status = rep.status;
    const data = await rep.json();

    if (status === 200) { //Usuario Existente.

        const dataUser = data.content.map((user) => {
            return {
                status: status,
                data: user
            }
        });

        return dataUser[0];

    } else if (status === 404) { //Usuario no existente.

        const dataUser = {
            status: status,
            data: {}
        }

        return dataUser;
    }

    // Error en el servidor.
    const dataUser = {
        status: status,
        data: {}
    }

    return dataUser;

}