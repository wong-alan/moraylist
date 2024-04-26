import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import "./filter.css";

const Following = () => {
    const { clientId, code } = useAppContext();
    const { openError, setOpenError, errorMessage, setErrorMessage } = useFollowPageContext();
    const [ artists, setArtists ] = useState<(Artist|undefined)[]>([...Array(25)]);
    const [ filterText, setFilterText ] = useState<string>("");

    const cardRefs = useRef<(HTMLDivElement|null)[]>([]);
    const noResultRef = useRef<HTMLDivElement>(null);
    const firstRender = useRef<boolean>(true);

    useEffect(() => {
        // TODO: Paginate followed artists (?)
        fetchFollowing(clientId, code!).then(data => {
            if (data) {
                setArtists(data);
            } else {
                setErrorMessage("Error loading artists. Try again.");
                setOpenError(true);
            }
        })
    }, [code]);

    useLayoutEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        if (!artists.length || artists[0] == undefined) {
            return;
        }
        let flipNoRes = false;

        const cardState = Flip.getState(cardRefs.current, {simple: true});
        const noResState = Flip.getState(noResultRef.current, {simple: true});

        const normalizedFilter = normalize(filterText)!.trim();

        // Handle filtering cards from search box
        cardRefs.current.forEach((card) => {
            if (normalize(card!.id)?.includes(normalizedFilter)) {
                card!.classList.remove("filtered");
            } else {
                card!.classList.add("filtered");
            }
        });

        // Handle showing "no result" text
        if (cardRefs.current.every((card) =>
            card!.classList.contains("filtered")
            || card!.classList.contains("unfollowed"))
        ) {
            if (!noResultRef.current!.classList.contains("show")) {
                noResultRef.current!.classList.add("show");
                flipNoRes = true;
            }
        } else {
            if (noResultRef.current!.classList.contains("show")) {
                noResultRef.current!.classList.remove("show");
                flipNoRes = true;
            }
        }

        Flip.from(cardState, {
            duration: 0.4,
            absolute: true,
            ease: "power2.inOut",
            simple: true,
            onEnter: elements => gsap.fromTo(
                elements,
                {
                  opacity: 0,
                  scale: 0
                }, {
                  opacity: 1,
                  scale: 1,
                  delay: 0.2,
                  duration: 0.3
                }
            ),
            onLeave: elements => gsap.to(elements, {opacity: 0, scale: 0, duration: 0.3})
        });

        if (flipNoRes) {
            Flip.from(noResState, {
                // Absolute position when leaving so "no result" element doesn't
                // get pushed by the re-entering cards
                absolute: !noResultRef.current!.classList.contains("show"),
                toggleClass: "flipping",
                simple: true,
                onEnter: elements => {
                    return gsap.fromTo(elements,
                    {
                        opacity: 0
                    }, {
                        opacity: 1,
                        delay: 0.15,
                        duration: 0.2
                    })
                },
                onLeave: elements => gsap.to(elements, {opacity: 0, duration: 0.15})
            });
        }
    }, [filterText]);

    const animateUnfollow = (
        removedCard: HTMLDivElement|null
    ) => () => {
        if (!removedCard) {
            return;
        }
        const cardState = Flip.getState(cardRefs.current, {simple: true});
        const noResState = Flip.getState(noResultRef.current, {simple: true});

        removedCard.classList.add("unfollowed");

        // Handle showing "no result" text
        if (cardRefs.current.every((card) =>
            card!.classList.contains("filtered")
            || card!.classList.contains("unfollowed"))
        ) {
            noResultRef.current!.classList.add("show");
        }

        Flip.from(cardState, {
            duration: 0.4,
            absolute: true,
            ease: "power2.inOut",
            simple: true,
            onLeave: elements => gsap.to(elements, {opacity: 0, scale: 0, duration: 0.3})
        });

        Flip.from(noResState, {
            simple: true,
            onEnter: elements => {
                return gsap.fromTo(elements,
                {
                    opacity: 0,
                }, {
                    opacity: 1,
                    delay: 0.2,
                    duration: 0.2
                })
            }
        });
    }

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
                    <Grid container item spacing={1}>
                        { artists.map((artist, index) =>
                            <Grid item
                                xs={6} sm={4} md={3} lg={12/5} xl={2}
                                key={`artist-${index}`}
                                className="artist-card-container"
                                id={artist?.name}
                                ref={(cardRef) => (cardRefs.current[index] = cardRef)}
                            >
                                <ArtistCard
                                    artist={artist}
                                    onUnfollow={animateUnfollow(cardRefs.current[index])}
                                />
                            </Grid>
                        )}
                    </Grid>
                    { artists.length ?
                        <Grid item xs={12}
                            className="no-result"
                            ref={noResultRef}
                        >
                            <NoResults input={filterText} />
                        </Grid>
                        : <Grid item xs={12}>
                            <Typography
                                variant="h6"
                                className="metro-font"
                                sx={{
                                    width: "fit-content",
                                    margin: "10vh auto 0px auto"
                                }}
                            >
                                You haven't followed any artists yet!
                            </Typography>
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