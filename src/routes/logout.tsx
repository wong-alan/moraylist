import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../contexts/AppContext";

const Logout = () => {
    const { setCode, setProfile } = useContext(AppContext);

    useEffect(() => {
        localStorage.clear()
        setCode(null);
        setProfile(null);
    }, []);

    return (
        <Navigate to="/" />
    );
}

export default Logout;