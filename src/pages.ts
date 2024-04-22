import { useLocation } from "react-router-dom";

interface page {
    name: string,
    url: string
}

export const navPages: page[] = [
    { name: "Followed Artists",  url: "/following" },
    { name: "Shuffle Playlists", url: "/shuffle" },
    { name: "Recently Played",   url: "/recent" },
    { name: "Analyze Playlists", url: "/analyze"}
];

const titleMap: Record<string, string> = {
    "/": "A Spotify Toolbox",
    "/profile": "Your Profile",
    "/following": "Your Followed Artists",
    "/shuffle": "Shuffle Playlists",
    "/recent": "Recently Played",
    "/analyze": "Analyze Playlists"
};

export const usePageTitle = () => {
    const location = useLocation().pathname;
    document.title = `${titleMap[location] ?? 'A Spotify Toolbox'} | Splotchify`
}