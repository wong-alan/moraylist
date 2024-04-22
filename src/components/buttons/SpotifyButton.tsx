import ButtonBase from "./ButtonBase/ButtonBase";
import SpotifyIcon from "../icons/SpotifyIcon";

const SpotifyButton = () => {
    return (
        <ButtonBase
            buttonText = "Sign in with Spotify"
            buttonIcon = {<SpotifyIcon/>}
        />
    );
}

export default SpotifyButton;