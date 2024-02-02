import { Button, ThemeProvider, createTheme } from "@mui/material";
import SpotifyIcon from "./icons/SpotifyIcon";

// Add 'Spotify' to palette
declare module '@mui/material/styles' {
    interface Palette {
      spotify: Palette['primary'];
    }

    interface PaletteOptions {
      spotify?: PaletteOptions['primary'];
    }
}

// Add 'Spotify' to Button color options
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
      spotify: true;
    }
}

// Declare theme colors
const spotifyTheme = createTheme({
    palette: {
        spotify: {
            main: '#1DB954'
        }
    }
});

const SpotifyButton = () => {
    return (
        <ThemeProvider theme={spotifyTheme}>
            <Button
              color="spotify"
              variant="contained"
              startIcon={<SpotifyIcon />}
              className="spotify-font"
            >
                Sign in with Spotify
            </Button>
        </ThemeProvider>
    );
}

export default SpotifyButton;