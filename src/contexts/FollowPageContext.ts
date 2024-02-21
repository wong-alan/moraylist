import { Dispatch, SetStateAction, createContext } from "react";
interface IFollowPageContext {
    setUnfollowError: Dispatch<SetStateAction<boolean>>
  }

const FollowPageContext = createContext<IFollowPageContext>({} as IFollowPageContext);

export default FollowPageContext;
