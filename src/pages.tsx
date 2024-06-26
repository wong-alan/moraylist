import { useLocation } from "react-router-dom";
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';

interface page {
    name: string,
    url: string,
    icon: React.ReactNode
}

export const navPages: page[] = [
    { name: "Followed Artists", url: "/following", icon: <EmojiPeopleRoundedIcon /> },
    { name: "Shuffle Playlist", url: "/shuffle",   icon: <ShuffleRoundedIcon /> },
    { name: "Recently Played",  url: "/recent",    icon: <HistoryRoundedIcon /> },
    { name: "Analyze Playlist", url: "/analyze",   icon: <TimelineRoundedIcon /> }
];

const titleMap: Record<string, string> = {
    "/": "A Toolbox for Spotify",
    "/profile": "Your Profile",
    // Nav pages
    "/following": "Your Followed Artists",
    "/shuffle": "Shuffle Playlists",
    "/recent": "Recently Played",
    "/analyze": "Analyze Playlists"
};

export const usePageTitle = () => {
    const location = useLocation().pathname;
    document.title = `${titleMap[location] ?? 'A Toolbox for Spotify'} | Moraylist`
}