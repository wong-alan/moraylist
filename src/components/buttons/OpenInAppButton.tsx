import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface OpenInAppProps {
    link: string
}

const OpenInAppButton = ({link}: OpenInAppProps) => {
    return (
        <Link to={link}
            aria-label="Open in Spotify"
            target="_blank"
            rel="noopener"
        >
            <IconButton
                aria-label="Open in Spotify"
                role="link"
                tabIndex={-1}
                sx={{ boxShadow: 5 }}
            >
                <OpenInNewIcon sx={{ color: "white" }} />
            </IconButton>
        </Link>
    );
}

export default OpenInAppButton;