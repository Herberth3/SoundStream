import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { Login, Registration } from "../pages";
import { SoundRouter } from "./SoundRouter";

export const AppRouter = () => {

    //Datos del usuario. 1 - usuario, 0 - admin.
    const [user, setUser] = useState({
        status: -1,
        data: {},
        type: 1,
    })


    return (
        <>
            <Routes>
                <Route path="/" element={<Login setUser={setUser} />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/*" element={<SoundRouter user={user} setUser={setUser} />} />
            </Routes>
        </>
    )
}
