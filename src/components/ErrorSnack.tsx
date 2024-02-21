import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


interface ErrorSnackProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const ErrorSnack = ({open, setOpen}: ErrorSnackProps) => {
    // const handleClick = () => {
    //     setOpen(true);
    // };

    const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                // message="This Snackbar will be dismissed in 5 seconds."
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Failed to unfollow. Try again.
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ErrorSnack;