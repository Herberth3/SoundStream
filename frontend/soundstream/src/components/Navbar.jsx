import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

//----------------- ICONOS -----------------
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RadioIcon from '@mui/icons-material/Radio';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AlbumIcon from '@mui/icons-material/Album';

//----------------- COLORES -----------------
import { purple } from '@mui/material/colors';

//----------------- PAGINAS -----------------
import { Album, Artist, Home, Profile, Playlist, Song, Search, Favorite } from '../pages';
import { PlayerControler } from './PlayerControler';


//------------- HOOKS PERSONALIZADOR ----------------
import { UseFetchListArtist, UseFetchListSong, UseFetchAlbum, UseFetchListPlaylist } from './hooks';
import { UseFetchPlaylistUser } from '../pages/hooks';


// ----------------------------------------------
// ------- CONFIGURACION MENU LATERAL -----------
// ----------------------------------------------

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: '#121212',
});


const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    backgroundColor: '#121212',
});


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#121212',
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        backgroundColor: '#121212',
    }),
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


//---------------------------------------
// ------- BARRA MENU LATERAL -----------
//---------------------------------------
export const Navbar = ({ user, setUser }) => {

    //Hook para navegar entre paginas.
    const navigate = useNavigate();

    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(1);


    //Lista de artistas.
    const { listArtist } = UseFetchListArtist();


    //Lista de canciones.
    const { listSong } = UseFetchListSong();


    //Lista de albumes.
    const { listAlbum } = UseFetchAlbum();


    //lista de playlist. 
    const { listPlaylist } = UseFetchListPlaylist();


    // Lista de playlist del usuario.
    const { listPlaylistUser } = UseFetchPlaylistUser(user);


    //Obtener playlist por favoritos.
    const getPlaylistFavorite = () => {

        const playlistFavorite = listPlaylistUser.find(playlist => playlist.nombre === "Favoritos");

        if (playlistFavorite) {
            return playlistFavorite;
        }
        return null;

    }

    //Lista de canciones.
    const [player, setPlayer] = useState([{
        name: "",
        artitist: "",
        src: ""
    }]);



    //Funcion para navegar a la pagina de login.
    const onLogin = () => {
        navigate('/', {
            replace: true, //No dejar que la persona regrese a la pagina anterior.
        });
    }


    //Funcion para abrir el menu lateral.
    const handleDrawerOpen = () => {
        setOpen(true);
    };


    //Funcion para cerrar el menu lateral.
    const handleDrawerClose = () => {
        setOpen(false);
    };


    //Obtener artista por ID.
    const getArtist = (id) => {
        const artistName = listArtist.find(artist => artist.id_artista === id);

        if (artistName) {
            return artistName.nombre;
        }

        return null;
    }


    //Funcion para reproducir musica aleatoria
    const handleRandom = () => {
        const sizeListSong = listSong.length;

        if (sizeListSong === 0) {
            alert("No hay canciones para reproducir");
            return;
        }

        const random = Math.floor(Math.random() * listSong.length);

        const songRandom = listSong[random];

        const songPlay = {
            name: songRandom.nombre,
            artist: getArtist(songRandom.id_artista),
            src: songRandom.mp3
        }

        setPlayer([songPlay]);
    }

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                color: purple[300],
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            SoundStream
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>

                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose} sx={{ color: purple[300] }}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>

                    <Divider />
                    <List>
                        <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setSelectedIndex(1)} >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <HomeIcon sx={{ color: purple[300] }} />
                                </ListItemIcon>
                                <ListItemText primary="Inicio"
                                    sx={{
                                        opacity: open ? 1 : 0,
                                        color: purple[50]
                                    }} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setSelectedIndex(2)} >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <SearchIcon sx={{ color: purple[300] }} />
                                </ListItemIcon>
                                <ListItemText primary="Buscar"
                                    sx={{
                                        opacity: open ? 1 : 0,
                                        color: purple[50]
                                    }} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setSelectedIndex(3)} >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <LibraryMusicIcon sx={{ color: purple[300] }} />
                                </ListItemIcon>
                                <ListItemText primary="Playlist"
                                    sx={{
                                        opacity: open ? 1 : 0,
                                        color: purple[50]
                                    }} />
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setSelectedIndex(4)} >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <FavoriteIcon sx={{ color: purple[300] }} />
                                </ListItemIcon>
                                <ListItemText primary="Favoritos"
                                    sx={{
                                        opacity: open ? 1 : 0,
                                        color: purple[50]
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>


                        <ListItem disablePadding sx={{ display: 'block' }} onClick={handleRandom} >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <RadioIcon sx={{ color: purple[300] }} />
                                </ListItemIcon>
                                <ListItemText primary="Radio"
                                    sx={{
                                        opacity: open ? 1 : 0,
                                        color: purple[50]
                                    }} />
                            </ListItemButton>
                        </ListItem>

                        {
                            user.type === 1 ? (
                                <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setSelectedIndex(7)} >
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <PersonIcon sx={{ color: purple[300] }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Perfil"
                                            sx={{
                                                opacity: open ? 1 : 0,
                                                color: purple[50]
                                            }} />
                                    </ListItemButton>
                                </ListItem>
                            ) : null
                        }


                        {
                            user.type === 0 ? (
                                <React.Fragment>
                                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setSelectedIndex(8)} >
                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <PersonAddIcon sx={{ color: purple[300] }} />
                                            </ListItemIcon>
                                            <ListItemText primary="Artista"
                                                sx={{
                                                    opacity: open ? 1 : 0,
                                                    color: purple[50]
                                                }} />
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setSelectedIndex(9)} >
                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <MusicNoteIcon sx={{ color: purple[300] }} />
                                            </ListItemIcon>
                                            <ListItemText primary="Canción"
                                                sx={{
                                                    opacity: open ? 1 : 0,
                                                    color: purple[50]
                                                }} />
                                        </ListItemButton>
                                    </ListItem>


                                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => setSelectedIndex(10)} >
                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <AlbumIcon sx={{ color: purple[300] }} />
                                            </ListItemIcon>
                                            <ListItemText primary="Álbum"
                                                sx={{
                                                    opacity: open ? 1 : 0,
                                                    color: purple[50]
                                                }} />
                                        </ListItemButton>
                                    </ListItem>

                                </React.Fragment>

                            ) : null
                        }

                        <ListItem disablePadding sx={{ display: 'block' }} onClick={onLogin} >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <LogoutIcon sx={{ color: purple[300] }} />
                                </ListItemIcon>
                                <ListItemText primary="Cerrar Sesión"
                                    sx={{
                                        opacity: open ? 1 : 0,
                                        color: purple[50]
                                    }} />
                            </ListItemButton>
                        </ListItem>

                    </List>
                    <Divider />

                </Drawer>

                {/* <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#212121', color: 'white', }}> */}
                <Box component="main" sx={{ flexGrow: 1 }}>
                    <DrawerHeader />
                    {selectedIndex === 1 && <Home setPlayer={setPlayer} listArtist={listArtist} listSong={listSong} listAlbum={listAlbum} listPlaylist={listPlaylist} />}
                    {selectedIndex === 2 && <Search setPlayer={setPlayer} listArtist={listArtist} listSong={listSong} listAlbum={listAlbum} listPlaylist={listPlaylist} />}
                    {selectedIndex === 3 && <Playlist setPlayer={setPlayer} listArtist={listArtist} listSong={listSong} listAlbum={listAlbum} listPlaylist={listPlaylist} user={user} listPlaylistUser={listPlaylistUser} />}
                    {selectedIndex === 4 && <Favorite setPlayer={setPlayer} listArtist={listArtist} listSong={listSong} getPlaylistFavorite={getPlaylistFavorite} />}
                    {selectedIndex === 7 && <Profile user={user} setUser={setUser} />}
                    {selectedIndex === 8 && <Artist listArtist={listArtist} />}
                    {selectedIndex === 9 && <Song listArtist={listArtist} listSong={listSong} />}
                    {selectedIndex === 10 && <Album listArtist={listArtist} listSong={listSong} listAlbum={listAlbum} />}

                    <PlayerControler player={player} />

                </Box>
            </Box>
        </>
    );
}
