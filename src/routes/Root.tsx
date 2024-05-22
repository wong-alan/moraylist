import { Outlet } from "react-router-dom";
import Header from "../components/nav/Header";
import { usePageTitle } from "../pages";

const Root = () => {
    usePageTitle();

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default Root;