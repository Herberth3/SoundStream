import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Tabs, Tab } from '@mui/material';
import { ListSong, ListAlbum, ListPlaylist } from '../components';


// ----------------- COMPONENTS -----------------
// import { AudioPlayer } from '../components';

import './css/home.css'; // Stylesheet of this component.

//Color personalizado para el TextField.
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const Home = ({ setPlayer, listArtist, listSong, listAlbum, listPlaylist }) => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <Box sx={{ backgroundColor: '#212121', height: 680, width: '100%', }}>
            <Box sx={{ backgroundColor: '#212121', width: '100%', height: 600, }}>
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab sx={{ color: 'white' }} label="Canciones" {...a11yProps(0)} />
                        <Tab sx={{ color: 'white' }} label="Álbunes" {...a11yProps(1)} />
                        <Tab sx={{ color: 'white' }} label="Playlist" {...a11yProps(2)} />
                    </Tabs>

                    {value === 0 && <ListSong setPlayer={setPlayer} listArtist={listArtist} listSong={listSong} />}
                    {value === 1 && <ListAlbum setPlayer={setPlayer} listArtist={listArtist} listSong={listSong} listAlbum={listAlbum} />}
                    {value === 2 && <ListPlaylist setPlayer={setPlayer} listArtist={listArtist} listSong={listSong} listPlaylist={listPlaylist} />}

                </Box>
            </Box>
        </Box>
    );
}
