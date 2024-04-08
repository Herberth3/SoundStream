import { Box } from '@mui/material'
import { CardSong } from '../components/CardSong'

export const SearchSong = ({ setPlayer, songSearch, listArtist }) => {

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
                songSearch.length > 0
                    ? songSearch.map((song) => (
                        <CardSong key={song.id_cancion} listArtist={listArtist} setPlayer={setPlayer} song={song} />
                    ))
                    :
                    null
            }

        </Box>
    )

}
