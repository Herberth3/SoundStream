import React from 'react'
import { FormRegistration } from '../auth/components/FormRegistration';

import imgConfig from '../assets/slider'; // Import images config.

import './css/registration.css'

export const Registration = () => {
    return (
        <>
            <div className="container-registration">

                <div className="logo-container">
                    <img src={imgConfig.register} alt="..." />
                </div>

                <h4 className='title-registration'> Regístrate gratis para empezar a escuchar.</h4>

                <FormRegistration />

            </div>
        </>
    )
}
