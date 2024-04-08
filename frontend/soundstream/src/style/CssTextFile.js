import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

//Color personalizado para el TextField.
export const CssTextField = styled(TextField)({
    '& label': {
        color: '#FFFFFF',
    },
    '& label.Mui-focused': {
        color: '#CE93D8',
    },
    '& input': {
        color: '#FFFFFF',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#CE93D8',
    },
    '& .MuiFormHelperText-root': {
        color: '#FFFFFF',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#FFFFFF',
        },
        '&:hover fieldset': {
            borderColor: '#CE93D8',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#CE93D8',
        },
    },
});