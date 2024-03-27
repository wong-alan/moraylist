import { Navigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

interface ProtectedProps {
    route?: boolean,
    children?: React.ReactNode
}

const Protected = ({route=false, children=null}: ProtectedProps) => {
    const { code } = useAppContext();

    // User is not authenticated
    if (!code) {
        if (route) {
            return <Navigate to="/" />
        }
        return null;
    }
    return children;

}

export default Protected;