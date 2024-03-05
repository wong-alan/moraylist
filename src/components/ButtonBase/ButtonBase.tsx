import { Button, ThemeProvider, createTheme } from "@mui/material";
import "./ButtonBase.css"

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
            main: '#1DAD50'
        }
    }
});

interface ButtonBaseProps {
    buttonText: string,
    buttonIcon?: React.ReactNode,
    buttonSize?: "small" | "medium" | "large"
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const ButtonBase = ({
    buttonText,
    buttonIcon,
    buttonSize,
    onClick
}: ButtonBaseProps) => {
    return (
        <ThemeProvider theme={spotifyTheme}>
            <Button
                color="spotify"
                variant="contained"
                size={buttonSize}
                className="spotify-font"
                sx={{ boxShadow: 5 }}
                startIcon={buttonIcon}
                onClick={onClick}
            >
                {buttonText}
            </Button>
        </ThemeProvider>
    );
}

export default ButtonBase;