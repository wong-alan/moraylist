import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface OpenInAppProps {
    link: string
}

const OpenInAppButton = ({link}: OpenInAppProps) => {
    return (
        <Link href={link} target="_blank" rel="noopener">
            <IconButton sx={{ boxShadow: 5 }}>
                <OpenInNewIcon sx={{ color: "white" }} />
            </IconButton>
        </Link>
    );
}

export default OpenInAppButton;