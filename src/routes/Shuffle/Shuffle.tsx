import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, Flip } from "../../gsap";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useAppContext } from "../../contexts/AppContext";
import { useShufflePageContext } from "../../contexts/ShufflePageContext";
import { fetchUserPlaylists } from "../../spotify/playlist";
import ShufflePlaylistCard from "../../components/PlaylistCard/ShufflePlaylistCard";
import Searchbox from "../../components/Searchbox/Searchbox";
import NoResults from "../../components/NoResults";
import ErrorSnack from "../../components/ErrorSnack";
import { normalize } from "../../utils";
import "./Shuffle.css";
import "../filter.css";

const Shuffle = () => {
    const { clientId, code, profile } = useAppContext();
    const { openError, setOpenError, errorMessage, setErrorMessage } = useShufflePageContext();
    const [ playlists, setPlaylists ] = useState<(Playlist|undefined)[]>([...Array(16)]);
    const [ filterText, setFilterText ] = useState<string>("");
    const [ playlistMap, setPlaylistMap ] = useState<Map<string, Playlist>>();

    const playlistRefs = useRef<(HTMLDivElement|null)[]>([]);
    const noResultRef = useRef<HTMLDivElement>(null);
    const firstRender = useRef<boolean>(true);

    useEffect(() => {
        // TODO: Paginate playlists (?)
        if (!profile) {
            return;
        }
        fetchUserPlaylists(clientId, code!, profile!.id, true).then(data => {
            if (data) {
                setPlaylistMap(new Map(data.map((playlist) => [playlist.name, playlist])));
                setPlaylists(data);
            } else {
                setErrorMessage("Eror loading playlists. Try again.");
                setOpenError(true);
            }
        });
    }, [code, profile]);

    useLayoutEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        // Proxy for if playlists have been fetched
        if (!playlistMap) {
            return;
        }
        let flipNoRes = false;

        const cardState = Flip.getState(playlistRefs.current, {simple: true});
        const noResState = Flip.getState(noResultRef.current, {simple: true});

        const normalizedFilter = normalize(filterText)!.trim();

        // Handle filtering cards from search box
        playlistRefs.current.forEach((playlist) => {
            const playlistInfo = playlistMap.get(playlist!.id);
            if (!playlistInfo) {
                return;
            }
            if (normalize(playlistInfo.name)?.includes(normalizedFilter) ||
                normalize(playlistInfo.description)?.includes(normalizedFilter)
            ) {
                playlist!.classList.remove("filtered");
            } else {
                playlist!.classList.add("filtered");
            }
        });

        // Handle showing "no result" text
        if (playlistRefs.current.every((playlist) =>
            playlist!.classList.contains("filtered"))
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

    return (
        <section id="shuffle">
            <Container maxWidth="xl">
                <Grid container>
                    <Grid size={{ xs: 0.25 }} />
                    <Grid size={{ xs: 11.5 }}>
                        <Typography
                            variant="h4"
                            className="title"
                        >
                            Shuffle Playlists
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 0.25 }} />
                    <Grid size={{ xs: 0.25 }} />
                    <Grid size={{ xs: 11.5 }}>
                        <Typography
                            variant="body1"
                            className="subtitle"
                        >
                            Tired of Spotify "shuffle" playing the same songs over and over? <br />
                            Your job is to fill playlists with good songs. Leave the order to us. <br />
                            Truly randomize your playlist and hear the songs you've been missing. <br />
                            <span className="shuffle-note">* you can only shuffle playlists that you have created</span>
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 0.25 }} />
                    <Grid size={{ xs: 0.25 }} />
                    <Grid size={{ xs: 11.5 }} sx={{position: "sticky", zIndex: 10, top: "30px"}}>
                        <Searchbox
                            label="Filter playlists by name"
                            placeholder="Filter playlists by name"
                            text={filterText}
                            setText={setFilterText}
                        />
                    </Grid>
                    <Grid size={{ xs: 0.25 }} />
                    { playlists.map((playlist, index) => (
                        <Grid container
                            size={{ xs: 6, sm: 4, md: 6, lg: 4 }}
                            key={`playlist-${index}`}
                            className="playlist-card-container"
                            id={playlist?.name}
                            ref={(playlistRef): void => {playlistRefs.current[index] = playlistRef}}
                            justifyContent={"center"}
                            width={"auto"} // GSAP will record "width: 100%" and animate weird without this
                        >
                            <ShufflePlaylistCard playlist={playlist}/>
                        </Grid>
                        ))
                    }
                    { playlists.length ?
                        <Grid size={{ xs: 12 }}
                            className="no-result"
                            ref={noResultRef}
                        >
                            <NoResults input={filterText} />
                        </Grid>
                        : <Grid size={{ xs: 12 }}>
                            <Typography
                                variant="h6"
                                className="metro-font"
                                sx={{
                                    width: "fit-content",
                                    margin: "10vh auto 0px auto"
                                }}
                            >
                                You haven't created any playlists yet!
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

export default Shuffle;