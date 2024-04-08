import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { setRegister } from './helpers/setRegister';

import '../css/formregister.css';


export const FormRegistration = () => {

    const navigate = useNavigate();


    const [month, setMonth] = useState(0);


    const [photo, setPhoto] = useState({
        profile: '',
        base64: '',
        name: '',
    });


    const { form, handleChange, handleReset } = useForm({
        nombre: '',
        apellido: '',
        email: '',
        contasenia: '',
        confirma: '',
        dia: '',
        anio: '',
    });


    const onLogin = () => {
        navigate('/', {
            replace: true, //No dejar que la persona regrese a la pagina anterior.
        });
    }

    //Funcion para manejar fotos de perfil y convertir a base 64.
    const handleFile = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            if (reader.readyState === 2) {
                const base64 = reader.result;
                var arrayB64 = base64.split(',');
                setPhoto({
                    profile: base64,
                    base64: arrayB64[1],
                    name: e.target.files[0].name,
                });
            }
        }
    }

    // Función para manejar el cambio en la selección del mes
    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    }

    //Funcion para manejar el submit del formulario.    
    const handleSubmit = (e) => {
        e.preventDefault(); //evita el recargo de la pagina

        //confirmar contraseña.
        if (form.contasenia !== form.confirma) {
            alert("Las contraseñas no coinciden");
            return;
        }

        //Validar foto de perfil
        if (photo.profile === '') {
            alert("Debe seleccionar una foto de perfil");
            return;
        }

        setRegister(form, photo, month);

        setPhoto({
            profile: '',
            base64: '',
            name: '',
        });

        setMonth(0);
        
        handleReset();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <div className="mb-3 mt-5">
                    <label htmlFor="nameInput" className="form-label custom-label">Cuál es tu nombre?</label>
                    <input type="text" required className="form-control custom-input" name='nombre' value={form.nombre} onChange={handleChange} placeholder="Nombre" />
                </div>

                <div className="mt-3">
                    <label htmlFor="lastNameInput" className="form-label custom-label">Cuál es tu apellido?</label>
                    <input type="text" required className="form-control custom-input" name='apellido' value={form.apellido} onChange={handleChange} placeholder="Apellido" />
                </div>

                <div className="mt-3">
                    <label htmlFor="emailInput" className="form-label custom-label">E-mail</label>
                    <input type="email" required className="form-control custom-input" name='email' value={form.email} onChange={handleChange} placeholder="Correo Electrónico" />
                </div>

                <div className="mt-3">
                    <label htmlFor="passwordInput" className="form-label custom-label">Personaliza tu contraseña</label>
                    <input type="password" required className="form-control custom-input" name='contasenia' value={form.contasenia} onChange={handleChange} placeholder="Contraseña" aria-describedby="passwordHelpBlock" />
                </div>

                <div className="mt-3">
                    <label htmlFor="confirmdInput" className="form-label custom-label">Confirma tu contraseña</label>
                    <input type="password" required className="form-control custom-input" name='confirma' value={form.confirma} onChange={handleChange} placeholder="Confirmar Contraseña" aria-describedby="passwordHelpBlock" />
                </div>

                <div className="mt-3">

                    <label htmlFor="birthdateForm" className="form-label custom-label">Fecha de nacimiento</label>

                    <div className="row g-3" id="birthdateForm">

                        <div className="col-auto">
                            <input type="text" required className="form-control custom-day" name='dia' value={form.dia} onChange={handleChange} placeholder="Día" />
                        </div>

                        <div className="col-auto">
                            <select className="form-select custom-month" value={month} onChange={handleMonthChange} placeholder="MM" aria-label="Default select example">
                                <option defaultValue={0}>MM</option>
                                <option value={1}>Enero</option>
                                <option value={2}>Febrero</option>
                                <option value={3}>Marzo</option>
                                <option value={4}>Abril</option>
                                <option value={5}>Mayo</option>
                                <option value={6}>Junio</option>
                                <option value={7}>Julio</option>
                                <option value={8}>Agosto</option>
                                <option value={9}>Septiembre</option>
                                <option value={10}>Octubre</option>
                                <option value={11}>Noviembre</option>
                                <option value={12}>Diciembre</option>
                            </select>
                        </div>

                        <div className="col-auto">
                            <input type="text" required className="form-control custom-year" name='anio' value={form.anio} onChange={handleChange} placeholder="YYYY" />
                        </div>
                    </div>
                </div>

                <div className="mt-3">
                    <label htmlFor="formFile" className="form-label custom-label">Foto Usuario</label>
                    <input required className="form-control custom-input" type="file" id="formFile" onChange={handleFile} />
                </div>

                <div className="d-grid gap-2 col-6 mx-auto mt-4">
                    <button className="btn btn-custom-register" type="submit">Registrarme</button>
                </div>

                <div className="row g-3 mt-1">
                    <div className="col-auto custom-spam">
                        <span> Ya tengo una cuenta </span>
                    </div>

                    <div className="col-auto">
                        <button type="button" onClick={onLogin} className="btn btn-link">Iniciar Sesión.</button>
                    </div>

                </div>

            </form>
        </>
    )
}
