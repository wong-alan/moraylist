import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import SpotifyButton from "../SpotifyButton";
import AppContext from "../../contexts/AppContext";
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

const Login = ({size}: LoginProps) => {
    const { clientId } = useContext(AppContext);
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
                <SpotifyButton />
            </Skeleton>
        );
    }

    const authUrl = generateAuthUrl(clientId, challenge);

    return (
        <Link to={authUrl} className={`login-${size}`} onClick={() => localStorage.setItem(VERIFIER, verifier)}>
            <SpotifyButton />
        </Link>
    );
}

export default Login;