import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { CreateArtist, ManageArtist } from '../components';

import imgConfig from '../assets/slider';


//Color personalizado para el TextField.
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export const Artist = ({ listArtist }) => {

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
                    <Tab sx={{ color: 'white' }} label="Editar" {...a11yProps(1)} />
                </Tabs>

                {value === 0 && <CreateArtist profile={imgConfig.profile} />}
                {value === 1 && <ManageArtist profile={imgConfig.profile} listArtist={listArtist} />}

            </Box>
        </Box>
    );
}
