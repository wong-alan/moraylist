import createTheme from '@mui/material/styles/createTheme';

// Add 'Spotify' to palette
declare module '@mui/material/styles' {
    interface Palette {
      spotify: Palette['primary'];
    }

    interface PaletteOptions {
      spotify?: PaletteOptions['primary'];
    }
}

// Update the component color options to include a Spotify option
declare module '@mui/material/Chip' {
    interface ChipPropsColorOverrides {
      spotify: true;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
      spotify: true;
    }
}

declare module '@mui/material/LinearProgress' {
    interface LinearProgressPropsColorOverrides {
      spotify: true;
    }
}

// Add custom breakpoints to theme
declare module '@mui/material/styles' {
    interface BreakpointOverrides {
      xs: true;
      sm: true;
      md: true;
      lg: true;
      xl: true;
      smd: true;
    }
}

const makeSpotifyTheme = () => {
    let spotifyTheme = createTheme({
        breakpoints: {
            values: {
            xs: 0,
            sm: 600,
            smd: 700,
            md: 900,
            lg: 1200,
            xl: 1536,
            },
        },
    });

    spotifyTheme = createTheme(spotifyTheme, {
        palette: {
            spotify: spotifyTheme.palette.augmentColor({
                color: {
                    main: "#1DB954",
                },
                name: "spotify",
            }),
        },
    });

    return spotifyTheme;
}

export default makeSpotifyTheme;