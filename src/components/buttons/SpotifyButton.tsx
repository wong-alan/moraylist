import { SystemStyleObject } from "@mui/system";
import ButtonBase from "./ButtonBase/ButtonBase";
import SpotifyIcon from "../icons/SpotifyIcon";

interface SpotifyButtonProps {
    text: string;
    sx?: SystemStyleObject
}

const SpotifyButton = ({text, sx}: SpotifyButtonProps) => {
    return (
        <ButtonBase
            buttonText={text}
            buttonIcon={<SpotifyIcon />}
            sx = {{
                minWidth: "168px",
                ...sx
            }}
        />
    );
}

export default SpotifyButton;