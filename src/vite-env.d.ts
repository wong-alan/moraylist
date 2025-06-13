/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
    readonly VITE_CLIENT_ID: string,
    readonly VITE_ENVIRONMENT: "local" | "online"
}