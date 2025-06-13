import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
interface IRecentPageContext {
    openError: boolean,
    setOpenError: Dispatch<SetStateAction<boolean>>,
    errorMessage: string,
    setErrorMessage: Dispatch<SetStateAction<string>>,
}

const RecentPageContext = createContext<IRecentPageContext>({} as IRecentPageContext);

interface RecentPageContextProps {
    children: React.ReactNode;
}

const RecentPageContextProvider = ({children}: RecentPageContextProps) => {
    const [ openError, setOpenError ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>("Error");

    const value: IRecentPageContext = {
        openError,
        setOpenError,
        errorMessage,
        setErrorMessage
    };

    return (
        <RecentPageContext.Provider value={value}>
            {children}
        </RecentPageContext.Provider>
    );
};

export const useRecentPageContext = () => {
    return useContext(RecentPageContext);
};

export default RecentPageContextProvider;
