import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { UseFetchUser } from './hooks/UseFetchUser';

import '../css/formlogin.css';


export const FormLogin = ({ setUser }) => {

  //Hook para navegar entre paginas.
  const navigate = useNavigate();


  //Estado del checkbox.
  const [check, setCheck] = useState(false)


  //Datos del formulario.
  const { form, handleChange, handleReset } = useForm({
    email: '',
    password: '',
  })


  //Boton hacia registro.
  const onRegister = () => {
    navigate('/registration', {
      replace: true, //No dejar que la persona regrese a la pagina anterior.
    });
  }


  //Manejar estado del checkbox.
  const handleCheck = (e) => {
    setCheck(e.target.checked);
  }


  //Boton hacia interfaz usuario.
  const onLogin = () => {
    navigate('/home', {
      replace: true, //No dejar que la persona regrese a la pagina anterior.
    });
  }


  //Enviar datos al backend.
  const handleSubmit = (e) => {
    e.preventDefault(); //Evitar que se recargue la pagina.

    //Enviar datos al backend.
    UseFetchUser(form, onLogin, setUser);

    //Limpiar formulario.
    if (check === false) {
      handleReset();
    }
  }


  return (
    <>
      <form onSubmit={handleSubmit}>

        <div className="input-group flex-nowrap custom-input-email">
          <span className="input-group-text" id="addon-wrapping">@</span>
          <input type="text" required className="form-control" name='email' value={form.email} onChange={handleChange} placeholder="Correo Electrónico" aria-label="Username" aria-describedby="addon-wrapping" />
        </div>


        <div className="custom-input-password">
          <input type="password" required className="form-control" name='password' value={form.password} onChange={handleChange} placeholder="Contraseña" aria-describedby="passwordHelpInline" />
        </div>


        <div className="form-check custom-check">
          <input className="form-check-input" value={check} onChange={handleCheck} type="checkbox" id="flexCheckDefault" />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Recordarme
          </label>
        </div>


        <div className="custom-buttom">
          <button type="submit" className="btn btn-primary w-75">Iniciar Sesión</button>
        </div>

      </form>


      <div className="row mt-2">
        <div className="col-6">
          <button type="button" className="btn btn-link">Olvidaste tu contraseña?</button>
        </div>

        <div className="col-6">
          <button type="button" onClick={onRegister} className="btn btn-link custom-btn-link">Registrarme</button>
        </div>
      </div>

    </>
  )
}
