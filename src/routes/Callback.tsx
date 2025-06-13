import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import ErrorPage from "./ErrorPage/ErrorPage";
import {
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    TOKEN_EXPIRY
} from "../spotify/auth";
import { CODE } from "../utils";
import { useAppContext } from "../contexts/AppContext";

const Callback = () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const { setCode } = useAppContext();

    // No auth code
    if (!code) {
        const error = params.get("error");
        return (
            <ErrorPage>
                <p>Authentication with Spotify failed.</p>
                {error && <p><i>{error}</i></p> }
            </ErrorPage>
        );
    }

    // Save new code
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(TOKEN_EXPIRY);
    localStorage.setItem(CODE, code);

    useEffect(() => {
        setCode(code);
    }, []);

    return (
        <Navigate to="/" replace />
    );
};

export default Callback;