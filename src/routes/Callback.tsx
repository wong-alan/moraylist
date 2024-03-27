import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import ErrorPage from "./ErrorPage/ErrorPage";
import { CODE } from "../utils";
import { useAppContext } from "../contexts/AppContext";

const Callback = () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    // No auth code
    if (!code) {
        const error = params.get("error");
        return (
            <ErrorPage>
                <p>Authentication with Spotify failed.</p>
                <p><i>{error}</i></p>
            </ErrorPage>
        );
    }

    // Save new code
    const { setCode } = useAppContext();
    localStorage.clear();
    localStorage.setItem(CODE, code);

    useEffect(() => {
        setCode(code);
    }, [])

    return (
        <Navigate to="/" replace />
    );
}

export default Callback;