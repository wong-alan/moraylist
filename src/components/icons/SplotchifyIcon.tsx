import { SvgIcon, SxProps, Theme } from "@mui/material";
import SplotchifyLogo from "../../assets/splotchify.svg?react"

export const SPLOTCHIFY_SVG = "./splotchify.svg";

const SplotchifyIcon = (sx?: SxProps<Theme>) => {
    return (
        <SvgIcon component={SplotchifyLogo} sx={sx}/>
    );
}

export default SplotchifyIcon;