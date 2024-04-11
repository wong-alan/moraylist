import { useRef } from "react";
import { gsap, Flip } from "../../gsap";
import Grid from "@mui/material/Grid";
import ArtistCard from "../ArtistCard/ArtistCard";
import ArtistCardSkeleton from "../ArtistCard/ArtistCardSkeleton";
import "./FollowedArtistGrid.css";

const animateUnfollow = (
    allCardRefs: React.RefObject<(HTMLDivElement|null)[]>,
    removedCard: HTMLDivElement|null
) => () => {
    if (!removedCard) {
        return;
    }
    const state = Flip.getState(allCardRefs.current);

    removedCard.classList.add("unfollow");

    Flip.from(state, {
        duration: 0.7,
        absolute: true,
        ease: "back.inOut(1.1)",
        onLeave: elements => gsap.to(elements, {opacity: 0, scale: 0, duration: 0.7})
    });
}

interface FollowedArtistGridProps {
    artists: (Artist|undefined)[]
}

const FollowedArtistGrid = ({artists}: FollowedArtistGridProps) => {

    const cardRefs = useRef<(HTMLDivElement|null)[]>([]);

    return (
        <Grid container item spacing={1}>
            { artists.length && artists.map((artist, index) => {
                return (
                    <Grid item
                        xs={6} sm={4} md={3} lg={12/5} xl={2}
                        key={`artist-${index}`}
                        className="artist-card-container"
                        ref={(el) => (cardRefs.current[index] = el)}
                    >
                        { artist ?
                            <ArtistCard
                                artist={artist}
                                onUnfollow={animateUnfollow(cardRefs, cardRefs.current[index])}
                            />
                        : <ArtistCardSkeleton key={`artist-skeleton-${index}`}/>
                        }
                    </Grid>);
            }) }
        </Grid>
    );
}

export default FollowedArtistGrid;