import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
    const [ firstRender, setFirstRender ] = useState<boolean>(true);

    useEffect(() => {
        localStorage.clear();
        setFirstRender(false);
    }, []);

    if (firstRender) {
        return;
    }

    return (
        <Navigate to="/" replace />
    );
};

export default Logout;