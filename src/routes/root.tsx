import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/nav/Header";
import { usePageTitle } from "../main";
import { useAppContext } from "../contexts/AppContext";

const loggedOutAllowed = ["/", "/callback", "/logout"];

const Root = () => {
    const {code} = useAppContext();
    const alwaysShow = loggedOutAllowed.includes(useLocation().pathname);

    usePageTitle();

    return (
        <>
            <Header />
            { (code || alwaysShow) && <Outlet /> }
        </>
    );
}

export default Root;