import { Dispatch, SetStateAction, useContext } from "react";
import Button from "@mui/material/Button";
import AppContext from "../../AppContext";
import { unfollowArtist } from "../../spotify/user";
import "./UnfollowButton.css"

const doUnfollow = async (
    clientId: string,
    code: string,
    artistId: string,
    setUnfollow: Dispatch<SetStateAction<boolean>>
) => {
    //return await unfollowArtist(clientId, code, artistId);
    setUnfollow(true);
}
interface UnfollowButtonProps {
    artistId: string,
    setUnfollow: Dispatch<SetStateAction<boolean>>
}

const UnfollowButton = ({ artistId, setUnfollow }: UnfollowButtonProps) => {
    const { clientId, code } = useContext(AppContext);

    return (
            <Button
                color="error"
                variant="contained"
                size="small"
                sx={{ boxShadow: 5 }}
                onClick={async () => await doUnfollow(clientId, code!, artistId, setUnfollow)}
            >
                Unfollow
            </Button>
    );
}

export default UnfollowButton;