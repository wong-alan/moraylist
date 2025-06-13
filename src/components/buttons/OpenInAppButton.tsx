import { Link } from "react-router-dom";
import SpotifyButton from "./SpotifyButton";

interface OpenInAppButtonProps {
    link: string;
    className?: string;
    condensed?: boolean;
}

const OpenInAppButton = ({link, className, condensed}: OpenInAppButtonProps) => {
    return (
        <Link to={link}
            className={className}
            aria-label="Open in Spotify"
            target="_blank"
            rel="noopener"
        >
            <SpotifyButton
                aria-label="Open in Spotify"
                aria-roledescription="Link"
                text="Open in Spotify"
                sx={condensed ? {
                        padding: "4px 11px"
                    }
                    : undefined}
            />
        </Link>
    );
};

export default OpenInAppButton;