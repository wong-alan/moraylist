import { SvgIcon, SxProps, Theme } from "@mui/material";
import SplotchifyLogo from "../../assets/splotchify.svg?react"

const SplotchifyIcon = (sx?: SxProps<Theme>) => {
    return (
        <SvgIcon component={SplotchifyLogo} sx={sx}/>
    );
}

export default SplotchifyIcon;