import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import Header from "../components/nav/Header";
import { CODE } from '../utils';
import { usePageTitle } from "../main";

const clientId: string = import.meta.env.VITE_CLIENT_ID;
const loggedOutAllowed = ["/", "/callback", "/logout"];

const Root = () => {
    const [code, setCode] = useState<string | null>(localStorage.getItem(CODE));
    const [profile, setProfile] = useState<UserProfile | null>(null);

    const alwaysShow = loggedOutAllowed.includes(useLocation().pathname);

    usePageTitle();

    return (
        <AppContext.Provider value={{
            clientId: clientId,
            code: code,
            setCode: setCode,
            profile: profile,
            setProfile: setProfile
        }}>
            <Header />
            { (code || alwaysShow) && <Outlet /> }
        </AppContext.Provider>
    );
}

export default Root;