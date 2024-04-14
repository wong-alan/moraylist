import Button from "@mui/material/Button";
import { SystemStyleObject } from "@mui/system";
import "./ButtonBase.css"

interface ButtonBaseProps {
    buttonText: string,
    buttonIcon?: React.ReactNode,
    buttonSize?: "small" | "medium" | "large",
    sx?: SystemStyleObject,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const ButtonBase = ({
    buttonText,
    buttonIcon,
    buttonSize,
    sx,
    onClick
}: ButtonBaseProps) => {
    return (
        <Button
            variant="contained"
            size={buttonSize}
            className="button-base"
            sx={{ boxShadow: 5, ...sx }}
            startIcon={buttonIcon}
            onClick={onClick}
        >
            {buttonText}
        </Button>
    );
}

export default ButtonBase;