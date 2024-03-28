import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
interface IShufflePageContext {
    openError: boolean,
    setOpenError: Dispatch<SetStateAction<boolean>>,
    errorMessage: string,
    setErrorMessage: Dispatch<SetStateAction<string>>,
}

const ShufflePageContext = createContext<IShufflePageContext>({} as IShufflePageContext);

interface ShufflePageContextProps {
    children: React.ReactNode;
}

const ShufflePageContextProvider = ({children}: ShufflePageContextProps) => {
    const [ openError, setOpenError ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>("Error");

    const value: IShufflePageContext = {
        openError,
        setOpenError,
        errorMessage,
        setErrorMessage
    };

    return (
        <ShufflePageContext.Provider value={value}>
            {children}
        </ShufflePageContext.Provider>
    );
}

export const useShufflePageContext = () => {
    return useContext(ShufflePageContext);
}

export default ShufflePageContextProvider;
