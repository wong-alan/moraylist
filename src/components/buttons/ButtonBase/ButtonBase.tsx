import Button from "@mui/material/Button";
import { SystemStyleObject } from "@mui/system";
import "./ButtonBase.css"

interface ButtonBaseProps {
    buttonText: string,
    buttonIcon?: React.ReactNode,
    buttonSize?: "small" | "medium" | "large",
    className?: string,
    sx?: SystemStyleObject,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const ButtonBase = ({
    buttonText,
    buttonIcon,
    buttonSize,
    className,
    sx,
    onClick
}: ButtonBaseProps) => {
    return (
        <Button
            variant="contained"
            size={buttonSize}
            color="spotify"
            className={["button-base", className].join(" ")}
            sx={{ boxShadow: 5, ...sx }}
            startIcon={buttonIcon}
            onClick={onClick}
        >
            {buttonText}
        </Button>
    );
}

export default ButtonBase;