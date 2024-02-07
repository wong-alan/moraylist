import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppContext from "../AppContext";
import Header from "../components/Header";
import { CODE } from '../utils';
import './root.css';  // EMPTY

const clientId = import.meta.env.VITE_CLIENT_ID;

const Root = () => {
    const [code, setCode] = useState<string|null>(localStorage.getItem(CODE));
    const [profile, setProfile] = useState<UserProfile|null>(null);

    return (
        <>
            <AppContext.Provider value={{
                    clientId: clientId,
                    code: code,
                    setCode: setCode,
                    profile: profile
                }}>
                <Header
                    userProfile = {profile}
                    setUserProfile = {setProfile} />
                <Outlet />
            </AppContext.Provider>
        </>
    );
}

export default Root;