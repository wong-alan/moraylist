import { Navigate } from "react-router-dom";
import Root from "./Root";
import { useAppContext } from "../contexts/AppContext";
import { useEffect, useState } from "react";

const ProtectedRoot = () => {
    const { spotify } = useAppContext();
    const [checkedAuth, setCheckedAuth] = useState<boolean>(false);
    const [auth, setAuth] = useState<boolean>(false);

    // User is not authenticated
    useEffect(() => {
        (async () => {
            await spotify.getAccessToken().then(token => setAuth(!!token));
            setCheckedAuth(true);
        })();
    }, []);

    if (!checkedAuth) {
        return <></>
    }

    if (!auth) {
        return <Navigate to="/" replace />
    }

    return <Root />

}

export default ProtectedRoot;