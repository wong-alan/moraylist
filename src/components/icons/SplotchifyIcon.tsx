import SvgIcon from "@mui/material/SvgIcon";
import SplotchifyLogo from "../../assets/splotchify.svg?react"

export const SPLOTCHIFY_SVG = "./splotchify.svg";

interface SplotchifyIconProps {
    size?: number
}

const SplotchifyIcon = ({size}: SplotchifyIconProps) => {
    return (
        <SvgIcon
            component={SplotchifyLogo}
            sx={{
                ...(size && {
                    width: size,
                    height: size})
            }}
        />
    );
}

export default SplotchifyIcon;