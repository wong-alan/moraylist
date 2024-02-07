import { createContext } from "react";
import { IAppContext } from "../types/globals";

const AppContext = createContext<IAppContext>({} as IAppContext);

export default AppContext;
