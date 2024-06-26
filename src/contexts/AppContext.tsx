import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { SpotifyApi, UserProfile } from "@spotify/web-api-ts-sdk";
import { CODE } from "../utils";
import { getSpotifyApi } from "../spotify/auth";

interface IAppContext {
    spotify: SpotifyApi
    clientId: string,
    code: string | null,
    setCode: Dispatch<SetStateAction<string | null>>,
    profile: UserProfile | null,
    setProfile: Dispatch<SetStateAction<UserProfile | null>>,
    authUpdate: number,
    setAuthUpdate: Dispatch<SetStateAction<number>>,
  }

const AppContext = createContext<IAppContext>({} as IAppContext);

// TODO: Remove from AppContext
const clientId: string = import.meta.env.VITE_CLIENT_ID;

interface AppContextProviderProps {
    children: React.ReactNode;
}

const AppContextProvider = ({children}: AppContextProviderProps) => {
    const [code, setCode] = useState<string | null>(localStorage.getItem(CODE));
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [authUpdate, setAuthUpdate] = useState<number>(0);

    const value: IAppContext = {
        spotify: getSpotifyApi(),
        clientId,
        code,
        setCode,
        profile,
        setProfile,
        authUpdate,
        setAuthUpdate
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    return useContext(AppContext);
}

export default AppContextProvider;
