import SpotifyButton from "../buttons/SpotifyButton";
import { useAppContext } from "../../contexts/AppContext";
import { authenticateSpotify } from "../../spotify/auth";
import "./Login.css";

interface LoginProps {
    size: "sm"|"lg"
}

const LOGIN_BUTTON_TEXT = "Login with Spotify";

const Login = ({size}: LoginProps) => {
    const { spotify } = useAppContext();

    return (
        <SpotifyButton
            className={`login-${size}`}
            text={LOGIN_BUTTON_TEXT}
            onClick={() => authenticateSpotify(spotify)}
        />
    );
}

export default Login;