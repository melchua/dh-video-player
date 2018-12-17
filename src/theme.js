import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';
import { dark } from '@material-ui/core/styles/createPalette';


export default createMuiTheme({
    palette: {
        type: 'dark',
        primary: purple,
        secondary: purple, // Indigo is probably a good match with pink
    }
});