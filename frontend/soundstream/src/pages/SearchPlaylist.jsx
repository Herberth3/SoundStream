import { Box } from '@mui/material'
import { CardPlaylist } from '../components/CardPlaylist'

export const SearchPlaylist = ({ setPlayer, playlistSearch, listArtist, listSong }) => {
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
                playlistSearch.length > 0
                    ?
                    playlistSearch.map((playList) => (
                        <CardPlaylist key={playList.id_playlist} setPlayer={setPlayer} listArtist={listArtist} listSong={listSong} playList={playList} />
                    ))
                    :
                    null
            }

        </Box>
    )
}
