import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Logout = () => {
    const { setCode, setProfile } = useAppContext();

    useEffect(() => {
        localStorage.clear();
        setCode(null);
        setProfile(null);
    }, []);

    return (
        <Navigate to="/" replace />
    );
}

export default Logout;