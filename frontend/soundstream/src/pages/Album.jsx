import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { AddSong, CreateAlbum, DetailsAlbum, ManageAlbum } from '../components';

import imgConfig from '../assets/slider';


//Color personalizado para el TextField.
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const Album = ({ listArtist, listSong, listAlbum }) => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ backgroundColor: '#212121', width: '100%', height: 600, }}>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab sx={{ color: 'white' }} label="Crear" {...a11yProps(0)} />
                    <Tab sx={{ color: 'white' }} label="Agregar Canción" {...a11yProps(1)} />
                    <Tab sx={{ color: 'white' }} label="Detalle" {...a11yProps(2)} />
                    <Tab sx={{ color: 'white' }} label="Editar" {...a11yProps(3)} />
                </Tabs>

                {value === 0 && <CreateAlbum profile={imgConfig.albumprofile} listArtist={listArtist} />}
                {value === 1 && <AddSong listAlbum={listAlbum} listArtist={listArtist} listSong={listSong} />}
                {value === 2 && <DetailsAlbum listAlbum={listAlbum} listArtist={listArtist} listSong={listSong} />}
                {value === 3 && <ManageAlbum profile={imgConfig.albumprofile} listArtist={listArtist} listAlbum={listAlbum} />}

            </Box>
        </Box>
    )
}
