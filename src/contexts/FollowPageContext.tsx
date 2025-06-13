import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
interface IFollowPageContext {
    openError: boolean,
    setOpenError: Dispatch<SetStateAction<boolean>>,
    errorMessage: string,
    setErrorMessage: Dispatch<SetStateAction<string>>,
}

const FollowPageContext = createContext<IFollowPageContext>({} as IFollowPageContext);

interface FollowPageContextProps {
    children: React.ReactNode;
}

const FollowPageContextProvider = ({children}: FollowPageContextProps) => {
    const [ openError, setOpenError ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>("Error");

    const value: IFollowPageContext = {
        openError,
        setOpenError,
        errorMessage,
        setErrorMessage
    };

    return (
        <FollowPageContext.Provider value={value}>
            {children}
        </FollowPageContext.Provider>
    );
};

export const useFollowPageContext = () => {
    return useContext(FollowPageContext);
};

export default FollowPageContextProvider;
