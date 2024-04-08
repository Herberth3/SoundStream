import { Box } from '@mui/material'
import { CardAlbum } from '../components/CardAlbum'


export const SearchAlbum = ({ setPlayer, albumSearch, listArtist, listSong }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 545,
            overflowX: 'auto',
        }}>

            {
                albumSearch.length > 0
                    ? albumSearch.map((album) => (
                        <CardAlbum key={album.id_album} setPlayer={setPlayer} listArtist={listArtist} listSong={listSong} album={album} />
                    ))
                    :
                    null
            }
        </Box>
    )
}
