import React from 'react';
import { SliderSound } from '../components/SliderSound';
import { FormLogin } from '../auth/components/FormLogin';

import imgConfig from '../assets/slider'; // Import images config.
import './css/login.css';

export const Login = ({ setUser }) => {

    return (
        <>
            <div className='container-sound'>

                <div className='container-carousel'>
                    <SliderSound imgConfig={imgConfig} />
                </div>

                <div className="container-login">
                    <div className="logo-container">
                        <img src={imgConfig.logo} alt="..." />
                    </div>

                    <FormLogin setUser={setUser} />
                </div>
            </div>
        </>
    )

}
