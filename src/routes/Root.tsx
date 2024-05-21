import { Outlet } from "react-router-dom";
import Header from "../components/nav/Header";
import { usePageTitle } from "../pages";
import { useSpotify } from "../hooks/useSpotify";

const Root = () => {
    usePageTitle();
    const sdk = useSpotify();

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default Root;