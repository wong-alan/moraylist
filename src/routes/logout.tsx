import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_EXPIRY } from "../spotify/auth";
import { CODE } from "../utils";

const Logout = () => {
    const { setCode, setProfile } = useContext(AppContext);

    useEffect(() => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(TOKEN_EXPIRY);
        localStorage.removeItem(CODE);
        setCode(null);
        setProfile(null);
    }, []);

    return (
        <Navigate to="/" />
    );
}

export default Logout;