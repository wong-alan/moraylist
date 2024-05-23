import { SystemStyleObject } from "@mui/system";
import ButtonBase from "./ButtonBase/ButtonBase";
import SpotifyIcon from "../icons/SpotifyIcon";

interface SpotifyButtonProps {
    text: string,
    className?: string,
    sx?: SystemStyleObject,
    onClick?: () => void,
}

const SpotifyButton = ({text, className, sx, onClick}: SpotifyButtonProps) => {
    return (
        <ButtonBase
            buttonText={text}
            buttonIcon={<SpotifyIcon />}
            className={className}
            sx = {{
                minWidth: "168px",
                ...sx
            }}
            onClick={onClick}
        />
    );
}

export default SpotifyButton;