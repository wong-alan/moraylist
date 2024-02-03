import { useEffect, useState } from "react";
import SpotifyButton from "../SpotifyButton";
import { CircularProgress } from "@mui/material";
import { VERIFIER, generateAuthUrl, generateCodeChallenge, generateCodeVerifier } from "../../auth";
import './Login.css';

const clientId = import.meta.env.VITE_CLIENT_ID;

const Login = () => {
    const verifier = generateCodeVerifier(128);
    const [challenge, setChallenge] = useState<string | null>(null);

    useEffect(() => {
        generateCodeChallenge(verifier)
            .then(data => {
                localStorage.setItem(VERIFIER, verifier);
                setChallenge(data);
            })
    }, []);

    if (!challenge) {
        return (
            <CircularProgress id="login"/>
        );
    }

    const authURL = generateAuthUrl(clientId, challenge);

    return (
        <a href={authURL}>
            <SpotifyButton />
        </a>
    );
}

export default Login;