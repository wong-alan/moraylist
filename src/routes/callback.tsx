import { Navigate } from "react-router-dom";
import { CODE } from "../utils";
import { useContext, useEffect, useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_EXPIRY } from "../spotify/auth";
import AppContext from "../contexts/AppContext";

const Callback = () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const { setCode } = useContext(AppContext);

    // Save new code
    if (code) {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(TOKEN_EXPIRY);
        localStorage.setItem(CODE, code);

        useEffect(() => {
            setCode(code);
        }, [])

        return (
            <Navigate to="/" replace />
        );
    }

    // No auth code
    const REDIRECT_TIME = 5;
    const error = params.get("error");
    const [timeLeft, setTimeLeft] = useState<number>(REDIRECT_TIME);

    useEffect(() => {
        if (!timeLeft) {
            return;
        }
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1)
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    return (
        <div id="error-page">
            <div id="error-message">
                <h1>Oops!</h1>
                { error && <p>Authentication with Spotify failed</p> }
                <p>Taking you back in ... {timeLeft}</p>
                { timeLeft == 0 && <Navigate to="/" /> }
            </div>
        </div>
    );
}

export default Callback;