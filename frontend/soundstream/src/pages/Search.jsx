import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button } from '@mui/material';
import { Tabs, Tab } from '@mui/material';
import { CssTextField } from '../style';
import { SearchSong, SearchAlbum, SearchPlaylist } from './';




//Color personalizado para el TextField.
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



export const Search = ({ setPlayer, listArtist, listSong, listAlbum, listPlaylist }) => {

    // Estado para el valor del TAB.
    const [value, setValue] = useState(0);


    // estado para el formulario.
    const [search, setSearch] = useState('');


    // Estado para la lista de canciones a bucar.
    const [songSearch, setSongSearch] = useState([]);


    //Estado para la lista de albumnes a buscar.
    const [albumSearch, setAlbumSearch] = useState([]);


    //Estado para la lista de albumnes a buscar.
    const [playlistSearch, setPlaylistSearch] = useState([]);


    // Función para cambiar el valor del TAB.
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };


    //Funcion para manejar los cambios en los campos del formulario.
    const handleChange = ({ target }) => {
        const { value } = target; //Obtenemos el valor y el nombre del campo.
        setSearch(
            value
        );
    }


    // Función para buscar las canciones.
    const handleSearchSong = (search) => {

        const songData = listSong.map(song => {
            if (song.nombre.toLowerCase().includes(search.toLowerCase())) {
                return song;
            }

            return null;
        });

        return songData.filter(song => song !== null); // Filtra los valores nulos del array antes de devolverlo
    }


    // Función para buscar los albunes.
    const handleSearchAlbum = (search) => {

        const albumData = listAlbum.map(album => {
            if (album.nombre.toLowerCase().includes(search.toLowerCase())) {
                return album;
            }

            return null;
        });

        return albumData.filter(album => album !== null); // Filtra los valores nulos del array antes de devolverlo
    }


    // Función para buscar las playlist.
    const handleSearchPlaylist = (search) => {

        const playlistData = listPlaylist.map(playlist => {
            if (playlist.nombre.toLowerCase().includes(search.toLowerCase())) {
                return playlist;
            }

            return null;
        });


        return playlistData.filter(playlist => playlist !== null); // Filtra los valores nulos del array antes de devolverlo
    }


    // Función para enviar el formulario.
    const handleSubmit = (e) => {

        // El buscador no debe de estar vacio.
        if (search === '') {
            return;
        }

        const songData = handleSearchSong(search);
        setSongSearch(songData); // Actualizamos el estado de la lista de canciones a buscar.

        const albumData = handleSearchAlbum(search);
        setAlbumSearch(albumData); // Actualizamos el estado de la lista de albumnes a buscar.

        const playlistData = handleSearchPlaylist(search);
        setPlaylistSearch(playlistData); // Actualizamos el estado de la lista de playlist a buscar.
    };


    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#212121',
                    display: 'flex',
                    flexDirection: 'column',
                    height: 680,
                    width: '100%',
                }}
            >

                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: 63, marginTop: 1.5, marginBottom: 1, }} >

                    <CssTextField
                        label="Buscar"
                        value={search}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment:
                                <SearchIcon sx={{ color: 'white', marginRight: 2 }}
                                    position="start"
                                />,
                        }}
                    />

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            m: 1,
                            width: '15ch',
                            height: '5ch',
                            backgroundColor: '#CE93D8',
                            '&:hover': { backgroundColor: '#CE93D8', },
                        }}
                        component="label"
                    >
                        Buscar
                    </Button>

                </Box>


                <Box sx={{ backgroundColor: '#212121', width: '100%', }}>

                    <Box sx={{ backgroundColor: '#212121', width: '100%', height: 600, }}>

                        <Box sx={{ width: '100%' }}>

                            <Tabs
                                value={value}
                                onChange={handleChangeTab}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="secondary tabs example"
                            >
                                <Tab sx={{ color: 'white' }} label="Canciones" {...a11yProps(0)} />
                                <Tab sx={{ color: 'white' }} label="Álbunes" {...a11yProps(1)} />
                                <Tab sx={{ color: 'white' }} label="Mis Playlist" {...a11yProps(2)} />
                            </Tabs>

                            {value === 0 && <SearchSong setPlayer={setPlayer} songSearch={songSearch} listArtist={listArtist} />}
                            {value === 1 && <SearchAlbum setPlayer={setPlayer} albumSearch={albumSearch} listArtist={listArtist} listSong={listSong} />}
                            {value === 2 && <SearchPlaylist setPlayer={setPlayer} playlistSearch={playlistSearch} listArtist={listArtist} listSong={listSong} />}

                        </Box>

                    </Box>

                </Box>

            </Box>

        </>
    )
}
