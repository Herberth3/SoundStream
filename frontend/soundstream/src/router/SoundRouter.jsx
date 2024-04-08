import React from 'react';
import { Navbar } from '../components';

export const SoundRouter = ({user, setUser}) => {
    return (
        <>
            <Navbar user={user} setUser={setUser} />
        </>
    )
}
