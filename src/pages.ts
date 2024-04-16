import { useLocation } from "react-router-dom";

interface page {
    name: string,
    url: string
}

export const navPages: page[] = [
    { name: "My Followed Artists", url: "/following" },
    { name: "Shuffle Playlists",   url: "/shuffle" },
    { name: "Recently Played",     url: "/recent" }
];

const titleMap: Record<string, string> = {
    "/": "A Spotify Toolbox",
    "/profile": "Your Profile",
    "/following": "Your Followed Artists",
    "/shuffle": "Shuffle Playlists",
    "/recent": "Recently Played",
};

export const usePageTitle = () => {
    const location = useLocation().pathname;
    document.title = `${titleMap[location] ?? 'A Spotify Toolbox'} | Splotchify`
}