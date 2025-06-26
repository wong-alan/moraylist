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
                fontWeight: "600",
                ...sx
            }}
        />
    );
};

export default SpotifyButton;