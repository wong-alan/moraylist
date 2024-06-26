import { useLayoutEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Logout = () => {
    const { spotify, setProfile, setAuthUpdate } = useAppContext();

    spotify.logOut();

    useLayoutEffect(() => {
        setProfile(null);
        setAuthUpdate(value => value + 1);
    }, []);

    return (
        <Navigate to="/" replace />
    );
}

export default Logout;