import 'vite/client'

namespace NodeJS {
  interface ProcessEnv {
    VITE_CLIENT_ID: string;
  }
}

interface IAppContext {
  clientId: string,
  code: string | null,
  setCode: Dispatch<SetStateAction<string | null>>,
  profile: UserProfile | null
}