import { useEffect, useState } from "react";
import SpotifyButton from "./SpotifyButton";
import { CircularProgress } from "@mui/material";
import { generateAuthURL, generateCodeChallenge, generateCodeVerifier } from "../spotify";

const clientId = import.meta.env.VITE_CLIENT_ID;

const Login = () => {
    const verifier = generateCodeVerifier(128);
    const [challenge, setChallenge] = useState<string | null>(null);

    useEffect(() => {
        generateCodeChallenge(verifier)
            .then(data => {
                localStorage.setItem("verifier", verifier);
                setChallenge(data);
            })
    }, []);

    if (!challenge) {
        return (
            <CircularProgress id="login"/>
        );
    }

    const authURL = generateAuthURL(clientId, challenge);

    return (
        <a href={authURL}>
            <SpotifyButton />
        </a>
    );
}

export default Login;