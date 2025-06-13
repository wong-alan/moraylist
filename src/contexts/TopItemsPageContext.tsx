import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
interface ITopItemsPageContext {
    openError: boolean,
    setOpenError: Dispatch<SetStateAction<boolean>>,
    errorMessage: string,
    setErrorMessage: Dispatch<SetStateAction<string>>,
}

const TopItemsPageContext = createContext<ITopItemsPageContext>({} as ITopItemsPageContext);

interface TopItemsPageContextProps {
    children: React.ReactNode;
}

const TopItemsPageContextProvider = ({children}: TopItemsPageContextProps) => {
    const [ openError, setOpenError ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>("Error");

    const value: ITopItemsPageContext = {
        openError,
        setOpenError,
        errorMessage,
        setErrorMessage
    };

    return (
        <TopItemsPageContext.Provider value={value}>
            {children}
        </TopItemsPageContext.Provider>
    );
};

export const useTopItemsPageContext = () => {
    return useContext(TopItemsPageContext);
};

export default TopItemsPageContextProvider;
