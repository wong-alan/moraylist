import { Dispatch, SetStateAction } from "react";
import Button from "@mui/material/Button";
import { useAppContext } from "../../contexts/AppContext";
import { useFollowPageContext } from "../../contexts/FollowPageContext";
import { unfollowArtist } from "../../spotify/user";
import "./ButtonBase/ButtonBase.css";

const doUnfollow = async (
    clientId: string,
    code: string,
    artistId: string,
    onUnfollow: () => void,
    setOpenError: Dispatch<SetStateAction<boolean>>,
    setErrorMessage: Dispatch<SetStateAction<string>>
) => {
    const result = await unfollowArtist(clientId, code, artistId);
    if (result) {
        onUnfollow();
    } else {
        setErrorMessage("Failed to unfollow artist. Try again.");
        setOpenError(true);
    }
};
interface UnfollowButtonProps {
    artistId: string,
    onUnfollow: () => void
}

const UnfollowButton = ({ artistId, onUnfollow }: UnfollowButtonProps) => {
    const { clientId, code } = useAppContext();
    const { setOpenError, setErrorMessage } = useFollowPageContext();

    return (
        <Button
            color="error"
            variant="contained"
            size="small"
            sx={{
                boxShadow: 5,
                bgcolor: "#2b2322",
                letterSpacing: "0.05em"
            }}
            onClick={async () =>
                await doUnfollow(clientId, code!, artistId, onUnfollow, setOpenError, setErrorMessage)
            }
        >
            Unfollow
        </Button>
    );
};

export default UnfollowButton;