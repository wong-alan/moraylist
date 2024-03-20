import SvgIcon from "@mui/material/SvgIcon";
import SplotchifyLogo from "../../assets/splotchify.svg?react"

export const SPLOTCHIFY_SVG = "./splotchify.svg";

const SplotchifyIcon = () => {
    return (
        <SvgIcon component={SplotchifyLogo} />
    );
}

export default SplotchifyIcon;