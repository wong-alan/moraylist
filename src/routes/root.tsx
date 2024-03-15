import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import Header from "../components/nav/Header";
import { CODE } from '../utils';

const clientId = import.meta.env.VITE_CLIENT_ID;

const Root = () => {
    const [code, setCode] = useState<string | null>(localStorage.getItem(CODE));
    const [profile, setProfile] = useState<UserProfile | null>(null);

    const loggedOutAllowed = ["/", "/callback"];
    const alwaysShow = loggedOutAllowed.includes(useLocation().pathname);

    return (
        <AppContext.Provider value={{
                clientId: clientId,
                code: code,
                setCode: setCode,
                profile: profile,
                setProfile: setProfile
            }}>
            <Header />
            { (profile || alwaysShow) && <Outlet /> }
        </AppContext.Provider>
    );
}

export default Root;