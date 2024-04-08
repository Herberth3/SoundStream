import { API_LOCAL_URL, ENPOINT_CREAR_ARTISTA } from '../../env';

const Swal = require('sweetalert2');


export const setArtist = async (form, { base64, name }, listArtist, setListArtist) => {

    const date = new Date(`${form.anio}-${form.mes}-${form.dia}`);

    const url = API_LOCAL_URL + ENPOINT_CREAR_ARTISTA;

    const newArtist = {
        nombre: form.nombre,
        nombreFoto: name,
        foto: base64,
        fecha: date
    };

    // Peticion al backend.
    const rep = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArtist)
    });

    const status = rep.status;
    const data = await rep.json();

    if (status === 200) { //Insertar Artista

        Swal.fire({
            title: 'Artista.',
            text: 'Se ha creado exitosamente el artista.',
            icon: 'success',
            confirmButtonText: 'Ok'
        });

    } else { //Error al insertar Artista.

        Swal.fire({
            title: 'Error!',
            text: `${data.content}`,
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }
}
