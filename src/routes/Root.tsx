import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/nav/Header";

const titleMap: Record<string, string> = {
    "/": "A Spotify Toolbox",
    "/profile": "Your Profile",
    "/following": "Your Followed Artists",
    "/shuffle": "Shuffle Playlists",
};

export const usePageTitle = () => {
    const location = useLocation().pathname;
    document.title = `${titleMap[location] ?? 'A Spotify Toolbox'} | Splotchify`
}

const Root = () => {
    usePageTitle();

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default Root;