import { SystemStyleObject } from "@mui/system";
import ButtonBase from "./ButtonBase/ButtonBase";
import SpotifyIcon from "../icons/SpotifyIcon";

interface SpotifyButtonProps {
    text: string;
    sx?: SystemStyleObject
    onClick?: () => void
}

const SpotifyButton = ({text, sx, onClick}: SpotifyButtonProps) => {
    return (
        <ButtonBase
            buttonText={text}
            buttonIcon={<SpotifyIcon />}
            sx = {{
                minWidth: "168px",
                ...sx
            }}
            onClick={onClick}
        />
    );
}

export default SpotifyButton;