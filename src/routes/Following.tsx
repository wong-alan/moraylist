import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, Flip } from "../gsap";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useAppContext } from "../contexts/AppContext";
import { useFollowPageContext } from "../contexts/FollowPageContext";
import { fetchFollowing } from "../spotify/user";
import ArtistCard from "../components/ArtistCard/ArtistCard";
import Searchbox from "../components/Searchbox/Searchbox";
import NoResults from "../components/NoResults";
import ErrorSnack from "../components/ErrorSnack";
import { normalize } from "../utils";

// TODO: Animate filter with GSAP Flip
const animateUnfollow = (
    allCardRefs: React.RefObject<(HTMLDivElement|null)[]>,
    removedCard: HTMLDivElement|null
) => () => {
    if (!removedCard) {
        return;
    }
    const state = Flip.getState(allCardRefs.current);
    console.log(`Removing ${removedCard.id}`);
    removedCard.classList.add("unfollow");

    Flip.from(state, {
        duration: 0.7,
        absolute: true,
        ease: "back.inOut(1.1)",
        onLeave: elements => gsap.to(elements, {opacity: 0, scale: 0, duration: 0.7})
    });
}

const Following = () => {
    const { clientId, code } = useAppContext();
    const { openError, setOpenError, errorMessage, setErrorMessage } = useFollowPageContext();
    const [ artists, setArtists ] = useState<(Artist|undefined)[]>([...Array(25)]);
    const [ filterText, setFilterText ] = useState<string>("");

    const cardRefs = useRef<(HTMLDivElement|null)[]>([]);

    useEffect(() => {
        // TODO: Paginate followed artists (?) Infinite scroll (?)
        fetchFollowing(clientId, code!).then(data => {
            if (data) {
                setArtists(data)
            } else {
                setErrorMessage("Error loading artists. Try again.");
                setOpenError(true);
            }
        })
    }, []);

    const visibleArtists = useMemo(
        () => {
            const normalizedFilter = normalize(filterText)!.trim();
            if (normalizedFilter === "") {
                return artists;
            }
            return artists.filter((artist) =>
                normalize(artist?.name)?.includes(normalizedFilter))
        },
        [artists, filterText]
    );

    return (
        <section id="following">
            <Container maxWidth="xl">
                <Grid container>
                    <Grid item xs={0.25} />
                    <Grid item xs={11.5}>
                        <Typography
                            variant="h4"
                            className="title"
                        >
                            Artists You Follow
                        </Typography>
                    </Grid>
                    <Grid item xs={0.25} />
                    <Grid item xs={0.25} />
                    <Grid item xs={11.5}>
                        <Typography
                            variant="body1"
                            className="subtitle"
                        >
                            Rediscover your followed artists. <br />
                            Not a stan anymore? Drop them like your ex. <br />
                        </Typography>
                    </Grid>
                    <Grid item xs={0.25} />
                    <Grid item xs={0.25} />
                    <Grid item xs={11.5} sx={{position: "sticky", zIndex: 10, top: "30px"}}>
                        <Searchbox
                            label="Filter artists by name"
                            placeholder="Filter artists by name"
                            text={filterText}
                            setText={setFilterText}
                        />
                    </Grid>
                    <Grid item xs={0.25} />
                    { visibleArtists.length ?
                        <Grid container item spacing={1}>
                            { visibleArtists.length && visibleArtists.map((artist, index) => {
                                return (
                                    <Grid item
                                        xs={6} sm={4} md={3} lg={12/5} xl={2}
                                        key={`artist-${index}`}
                                        className="artist-card-container"
                                        id={artist?.name}
                                        ref={(cardRef) => (cardRefs.current[index] = cardRef)}
                                    >
                                        <ArtistCard
                                            artist={artist}
                                            onUnfollow={animateUnfollow(cardRefs, cardRefs.current[index])}
                                        />
                                    </Grid>
                                );})
                            }
                        </Grid>
                    : <Grid item xs={12}>
                        <NoResults input={filterText} />
                    </Grid>
                    }
                </Grid>
            </Container>
            <ErrorSnack
                message={errorMessage}
                open={openError}
                setOpen={setOpenError}
            />
        </section>
    );
}

export default Following;