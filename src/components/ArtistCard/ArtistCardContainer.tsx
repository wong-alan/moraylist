import { useRef } from "react";
import Grid from "@mui/material/Grid";
import ArtistCard from "./ArtistCard";
import ArtistCardSkeleton from "./ArtistCardSkeleton";
import "./ArtistCardContainer.css";

const onUnfollow = (
    cardRef: React.RefObject<HTMLDivElement>,
) => () => {
    cardRef.current?.classList.add("unfollow");
}

interface ArtistCardContainerProps {
    artist: Artist|undefined
}

const ArtistCardContainer = ({artist}: ArtistCardContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    return (
        <Grid item
            xs={6} sm={4} md={3} lg={12/5} xl={2}
            ref={containerRef}
        >
            { artist ?
                <ArtistCard
                    artist={artist}
                    onUnfollow={onUnfollow(containerRef)}
                />
                : <ArtistCardSkeleton />
            }
        </Grid>
    );
}

export default ArtistCardContainer;