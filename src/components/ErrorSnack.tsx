import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


interface ErrorSnackProps {
    message: string,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const ErrorSnack = ({message, open, setOpen}: ErrorSnackProps) => {
    const handleClose = (_event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

export default ErrorSnack;