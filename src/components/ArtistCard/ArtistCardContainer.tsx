import { useState } from "react";
import Grid from "@mui/material/Grid";
import ArtistCard from "./ArtistCard";
import "./ArtistCardContainer.css";

interface ArtistCardContainerProps {
    artist: Artist
}

const ArtistCardContainer = ({artist}: ArtistCardContainerProps) => {
    const [unfollowed, setUnfollowed] = useState<boolean>(false);

    return (
        <Grid item xs={6} sm={4} md={3} lg={12/5} xl={2}
            className={unfollowed ? "unfollow" : ""}
        >
            <ArtistCard
                artist={artist}
                setUnfollow={setUnfollowed}
            />
        </Grid>
    );
}

export default ArtistCardContainer;