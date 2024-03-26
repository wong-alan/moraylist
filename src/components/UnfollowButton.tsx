import { Dispatch, SetStateAction, useContext } from "react";
import Button from "@mui/material/Button";

import { useAppContext } from "../contexts/AppContext";
import UnfollowPageContext from "../contexts/FollowPageContext";
import { unfollowArtist } from "../spotify/user";
import "./ButtonBase/ButtonBase.css"

const doUnfollow = async (
    clientId: string,
    code: string,
    artistId: string,
    setUnfollow: Dispatch<SetStateAction<boolean>>,
    setUnfollowError: Dispatch<SetStateAction<boolean>>
) => {
    const result = await unfollowArtist(clientId, code, artistId);
    if (result) {
        setUnfollow(true);
    } else {
        setUnfollowError(true);
    }
}
interface UnfollowButtonProps {
    artistId: string,
    setUnfollow: Dispatch<SetStateAction<boolean>>
}

const UnfollowButton = ({ artistId, setUnfollow }: UnfollowButtonProps) => {
    const { clientId, code } = useAppContext();
    const { setUnfollowError } = useContext(UnfollowPageContext);

    return (
            <Button
                color="error"
                variant="contained"
                size="small"
                sx={{ boxShadow: 5, bgcolor: "#2b2322", letterSpacing: "0.05em" }}
                onClick={async () =>
                    await doUnfollow(clientId, code!, artistId, setUnfollow, setUnfollowError)}
            >
                Unfollow
            </Button>
    );
}

export default UnfollowButton;