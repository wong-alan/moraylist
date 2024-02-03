import { Navigate } from "react-router-dom";
import { CODE, sleep } from "../utils";
import { useEffect, useState } from "react";

const Callback = () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    // Save new code
    if (code) {
        localStorage.setItem(CODE, code);
        console.log("Saved a new code!");
        return (
            <Navigate to="/" />
        );
    }

    // No auth code
    const REDIRECT_TIME = 5;
    const error = params.get("error");
    const [timeLeft, setTimeLeft] = useState<number>(REDIRECT_TIME);
    console.log("No new code!");
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