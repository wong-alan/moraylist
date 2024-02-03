import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { CODE } from '../utils';
import './root.css';  // EMPTY


// const clientId = import.meta.env.VITE_CLIENT_ID;

const Root = () => {
    const code = localStorage.getItem(CODE);

    return (
        <>
            <Header code={code} />
            <Outlet />
        </>
    );
}

export default Root;