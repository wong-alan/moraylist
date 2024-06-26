import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ErrorPage from "./ErrorPage/ErrorPage";
import { authenticateSpotify } from "../spotify/auth";
import { useAppContext } from "../contexts/AppContext";

const Callback = () => {
    const { spotify, setAuthUpdate } = useAppContext();
    const [checkedAuth, setCheckedAuth] = useState<boolean>(false);
    const [auth, setAuth] = useState<boolean>(false);

    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    const code = params.get("code");

    useEffect(() => {
        // Exit early if no code returned
        // Calling authenticate will try to redirect to login again
        // if it is unable to extract a code from url params
        if (!code) {
            setCheckedAuth(true);
            return;
        }

        (async () => {
            await authenticateSpotify(spotify).then(success => setAuth(success));
            setCheckedAuth(true);
            setAuthUpdate(value => value + 1);
            alert("Pause")
        })();
    }, []);

    if (!checkedAuth) {
        console.log("Auth not checked yet")
        return <></>
    }

    console.log("Auth checked")

    return (<>
        { auth ?
            <Navigate to="/" replace />
            : <ErrorPage>
                <p>Authentication with Spotify failed.</p>
                {error && <p><i>{error}</i></p> }
            </ErrorPage>
        }
    </>);
}

export default Callback;