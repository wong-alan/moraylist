import { Navigate } from "react-router-dom";
import Root from "./Root";
import { useAppContext } from "../contexts/AppContext";

const ProtectedRoot = () => {
    const { code } = useAppContext();

    // User is not authenticated
    if (!code) {
        return <Navigate to="/" replace />
    }

    return <Root />

}

export default ProtectedRoot;