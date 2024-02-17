import { Link, SvgIcon, SxProps, Theme } from "@mui/material";
import SplotchifyLogo from "../../assets/splotchify.svg?react"

export const SPLOTCHIFY_SVG = "./splotchify.svg";

interface SplotchifyIconProps {
    sx?: SxProps<Theme>
    href?: string
}

const SplotchifyIcon = ({sx, href}: SplotchifyIconProps) => {
    if (href) {
        return (
            <Link href={href}>
                <SvgIcon component={SplotchifyLogo} sx={sx}/>
            </Link>
        );
    }

    return (
        <SvgIcon component={SplotchifyLogo} sx={sx}/>
    );
}

export default SplotchifyIcon;