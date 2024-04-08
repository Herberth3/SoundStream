import { useState } from "react";

export const useForm = (initialForm = {}) => {

    const [form, setForm] = useState(initialForm); //valores del formulario.


    //Funcion para manejar los cambios en los campos del formulario.
    const handleChange = ({ target }) => {

        const { name, value } = target; //Obtenemos el valor y el nombre del campo.
        //Actualizamos el estado del formulario.
        setForm({
            ...form,
            [name]: value
        });
    }


    //Funcion para resetear los campos del formulario.
    const handleReset = () => {
        setForm(initialForm);
    }

    return {
        ...form,
        form,
        setForm,
        handleChange,
        handleReset,
    }
}
