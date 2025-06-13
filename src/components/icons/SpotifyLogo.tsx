import { SystemStyleObject } from "@mui/system";
import SvgIcon from "@mui/material/SvgIcon";
import SpotifyLogoSvg  from "../../assets/spotify_logo_rgb_white.svg?react";

interface SpotifyLogoProps {
    width?: number;
    height?: number;
    sx?: SystemStyleObject;
}

const SpotifyLogo = ({width, height, sx}: SpotifyLogoProps) => {
    return (
        <SvgIcon
            component={SpotifyLogoSvg}
            inheritViewBox
            title="Spotify Logo"
            sx={{
                "&": {
                    width: width ?? "initial",
                    height: height ?? "initial",
                    ...(sx && {...sx})
                }
            }}
        />
    );
};

export default SpotifyLogo;