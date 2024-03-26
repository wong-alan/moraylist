import { Dispatch, SetStateAction, createContext, useContext, useMemo, useState } from "react";
import { CODE } from "../utils";

interface IAppContext {
    clientId: string,
    code: string | null,
    setCode: Dispatch<SetStateAction<string | null>>,
    profile: UserProfile | null,
    setProfile: Dispatch<SetStateAction<UserProfile | null>>
  }

const AppContext = createContext<IAppContext>({} as IAppContext);

const clientId: string = import.meta.env.VITE_CLIENT_ID;

interface AppContextProviderProps {
    children: React.ReactNode;
}

const AppContextProvider = ({children}: AppContextProviderProps) => {
    const [code, setCode] = useState<string | null>(localStorage.getItem(CODE));
    const [profile, setProfile] = useState<UserProfile | null>(null);

    const value: IAppContext = useMemo(
        () => ({
            clientId,
            code,
            setCode,
            profile,
            setProfile
        }),
        [code, profile]
    );

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
