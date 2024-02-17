import Button from "@mui/material/Button";
import "./UnfollowButton.css"

const UnfollowButton = () => {
    return (
            <Button
                color="error"
                variant="contained"
                size="small"
                // startIcon={<SpotifyIcon />}
                // className="spotify-font"
                sx={{ boxShadow: 5 }}
            >
                Unfollow
            </Button>
    );
}

export default UnfollowButton;