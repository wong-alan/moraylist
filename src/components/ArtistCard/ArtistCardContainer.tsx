import { useState } from "react";
import Grid from "@mui/material/Grid";
import { ArtistCard } from "./ArtistCard";
import "./ArtistCardContainer.css";

interface ArtistCardContainerProps {
    artist: Artist
}

const ArtistCardContainer = ({artist}: ArtistCardContainerProps) => {
    const [unfollowed, setUnfollowed] = useState<boolean>(false);

    return (
        <Grid item
            className={unfollowed ? "unfollow" : ""}
        >
            <ArtistCard artist={artist} setUnfollow={setUnfollowed} />
        </Grid>
    );
}

export default ArtistCardContainer;