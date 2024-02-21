import { useContext, useEffect, useState } from "react";
import SpotifyButton from "../SpotifyButton/SpotifyButton";
import { CircularProgress } from "@mui/material";
import { VERIFIER, generateAuthUrl, generateCodeChallenge, generateCodeVerifier } from "../../spotify/auth";
import AppContext from "../../contexts/AppContext";
import { useLocation } from "react-router-dom";

const Login = () => {
    // Login component was overwriting verifier on callback
    // causing failed API calls
    if (useLocation().pathname == "/callback") {
        return;
    }

    const { clientId } = useContext(AppContext);
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

    const authUrl = generateAuthUrl(clientId, challenge);

    return (
        <a href={authUrl}>
            <SpotifyButton />
        </a>
    );
}

export default Login;