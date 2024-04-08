import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { CreatePlaylist, ManagePlaylist, AddSongPlaylist, DetailsPlaylist } from '../components';

import imgConfig from '../assets/slider';

// ---------- HOOKS PERSONALIZADOS ---------- 
// import { UseFetchPlaylistUser } from '../hooks';

//Color personalizado para el TextField.
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export const Playlist = ({ setPlayer, listArtist, listSong, listAlbum, listPlaylist, user, listPlaylistUser }) => {

  //Estado del componente TAB.
  const [value, setValue] = useState(0);


  // Lista de playlist del usuario.
  // const { listPlaylistUser } = UseFetchPlaylistUser(user);

  // console.log(listPlaylistUser);

  //Funcion para cambiar el estado del componente TAB.
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
            <Tab sx={{ color: 'white' }} label="Crear" {...a11yProps(0)} />
            <Tab sx={{ color: 'white' }} label="Agregar Canción" {...a11yProps(1)} />
            <Tab sx={{ color: 'white' }} label="Mis Playlist" {...a11yProps(2)} />
            <Tab sx={{ color: 'white' }} label="Editar" {...a11yProps(3)} />
          </Tabs>

          {value === 0 && <CreatePlaylist profile={imgConfig.albumprofile} user={user} />}
          {value === 1 && <AddSongPlaylist listPlaylistUser={listPlaylistUser} listSong={listSong} listArtist={listArtist} />}
          {value === 2 && <DetailsPlaylist setPlayer={setPlayer} listPlaylistUser={listPlaylistUser} listSong={listSong} listArtist={listArtist} />}
          {value === 3 && <ManagePlaylist profile={imgConfig.albumprofile} listPlaylistUser={listPlaylistUser} />}

        </Box>
      </Box>
    </Box>
  );
}
