import { Dispatch, SetStateAction } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Chip from "@mui/material/Chip";

// Add 'Spotify' to palette
declare module '@mui/material/styles' {
    interface Palette {
      spotify: Palette['primary'];
    }

    interface PaletteOptions {
      spotify?: PaletteOptions['primary'];
    }
}

// Update the Chip's color options to include a Spotify option
declare module '@mui/material/Chip' {
    interface ChipPropsColorOverrides {
      spotify: true;
    }
  }

let spotifyTheme = createTheme({});

spotifyTheme = createTheme(spotifyTheme, {
    palette: {
        spotify: spotifyTheme.palette.augmentColor({
            color: {
                main: "#1DAD50",
            },
            name: "spotify",
        }),
    },
});

interface Label {
    label: string
}

interface ChipGroupProps {
    labels: Record<string, Label> ,
    selected: string,
    setSelected: Dispatch<SetStateAction<string>>,
}

const ChipGroup = ({labels, selected, setSelected}: ChipGroupProps) => {
    const handleClick = (label: string) => () => {
        setSelected(label);
    }

    return (
        <ThemeProvider theme={spotifyTheme}>
        { Object.entries(labels).map(([key, label]) =>
            <Chip
                key={key}
                label={label.label}
                color="spotify"
                onClick={handleClick(key)}
                variant={key === selected ? "filled" : "outlined"}
                sx={{
                    margin: "0px 5px",
                    fontFamily: "inherit",
                    fontWeight: 500
                }}
            />)
        }
        </ThemeProvider>
    );
}

export default ChipGroup;