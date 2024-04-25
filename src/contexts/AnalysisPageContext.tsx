import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
interface IAnalysisPageContext {
    openError: boolean,
    setOpenError: Dispatch<SetStateAction<boolean>>,
    errorMessage: string,
    setErrorMessage: Dispatch<SetStateAction<string>>,
}

const AnalysisPageContext = createContext<IAnalysisPageContext>({} as IAnalysisPageContext);

interface AnalysisPageContextProps {
    children: React.ReactNode;
}

const AnalysisPageContextProvider = ({children}: AnalysisPageContextProps) => {
    const [ openError, setOpenError ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>("Error");

    const value: IAnalysisPageContext = {
        openError,
        setOpenError,
        errorMessage,
        setErrorMessage
    };

    return (
        <AnalysisPageContext.Provider value={value}>
            {children}
        </AnalysisPageContext.Provider>
    );
}

export const useAnalysisPageContext = () => {
    return useContext(AnalysisPageContext);
}

export default AnalysisPageContextProvider;
