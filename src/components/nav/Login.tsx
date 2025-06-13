import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import SpotifyButton from "../buttons/SpotifyButton";
import { useAppContext } from "../../contexts/AppContext";
import { VERIFIER,
    generateAuthUrl,
    generateCodeChallenge,
    generateCodeVerifier
} from "../../spotify/auth";
import { BASE_SKELETON_SX } from "../../utils";
import "./Login.css";

interface LoginProps {
    size: "sm"|"lg"
}

const LOGIN_BUTTON_TEXT = "Login with Spotify";

const Login = ({size}: LoginProps) => {
    const { clientId } = useAppContext();
    const [challenge, setChallenge] = useState<string>('');
    const [verifier, setVerifier] = useState<string>('');

    useEffect(() => {
        const verifier = generateCodeVerifier(128);
        generateCodeChallenge(verifier)
            .then(data => {
                setVerifier(verifier);
                setChallenge(data);
            })
    }, []);

    if (!challenge || !verifier) {
        return (
            <Skeleton
                className={`login-skeleton login-${size}`}
                variant="rounded"
                animation="wave"
                sx={{
                    ...BASE_SKELETON_SX,
                }}
            >
                <SpotifyButton text={LOGIN_BUTTON_TEXT} />
            </Skeleton>
        );
    }

    const authUrl = generateAuthUrl(clientId, challenge);

    return (
        <Link to={authUrl} className={`login-${size}`} onClick={() => localStorage.setItem(VERIFIER, verifier)}>
            <SpotifyButton text={LOGIN_BUTTON_TEXT} />
        </Link>
    );
};

export default Login;