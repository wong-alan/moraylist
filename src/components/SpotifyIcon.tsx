import { SvgIcon, SxProps, Theme } from "@mui/material";
import SpotifyLogo  from "../assets/spotify.svg?react";

const SpotifyIcon = (sx?: SxProps<Theme>) => {
    return (
        <SvgIcon component={SpotifyLogo} sx={sx}/>
    );
}

export default SpotifyIcon;