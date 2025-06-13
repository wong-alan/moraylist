import SvgIcon from "@mui/material/SvgIcon";
import SpotifyIconSvg  from "../../assets/spotify_icon_rgb_white.svg?react";

const SpotifyIcon = () => {
    return (
        <SvgIcon
            component={SpotifyIconSvg}
            inheritViewBox
        />
    );
};

export default SpotifyIcon;