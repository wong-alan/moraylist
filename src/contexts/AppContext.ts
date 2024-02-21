import { Dispatch, SetStateAction, createContext } from "react";
interface IAppContext {
    clientId: string,
    code: string | null,
    setCode: Dispatch<SetStateAction<string | null>>,
    profile: UserProfile | null,
    setProfile: Dispatch<SetStateAction<UserProfile | null>>
  }

const AppContext = createContext<IAppContext>({} as IAppContext);

export default AppContext;
