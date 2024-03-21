import Button from "@mui/material/Button";
import "./ButtonBase.css"

interface ButtonBaseProps {
    buttonText: string,
    buttonIcon?: React.ReactNode,
    buttonSize?: "small" | "medium" | "large"
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const ButtonBase = ({
    buttonText,
    buttonIcon,
    buttonSize,
    onClick
}: ButtonBaseProps) => {
    return (
        <Button
            variant="contained"
            size={buttonSize}
            className="button-base"
            sx={{ boxShadow: 5 }}
            startIcon={buttonIcon}
            onClick={onClick}
        >
            {buttonText}
        </Button>
    );
}

export default ButtonBase;