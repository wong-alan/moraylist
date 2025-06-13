import SvgIcon from "@mui/material/SvgIcon";
import MorayLogo from "../../assets/moray.svg?react";

export const MORAY_SVG = "./moray.svg";

interface MorayIconProps {
    size?: number
}

const MorayIcon = ({size}: MorayIconProps) => {
    return (
        <SvgIcon
            component={MorayLogo}
            sx={{
                ...(size && {
                    width: size,
                    height: size})
            }}
        />
    );
};

export default MorayIcon;