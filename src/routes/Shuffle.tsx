import { useEffect, useMemo, useState } from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { useAppContext } from "../contexts/AppContext";
import { useShufflePageContext } from "../contexts/ShufflePageContext";
import { fetchUserPlaylists } from "../spotify/playlist";
import ShufflePlaylistCard from "../components/PlaylistCard/ShufflePlaylistCard";
import Searchbox from "../components/Searchbox/Searchbox";
import ErrorSnack from "../components/ErrorSnack";

const Shuffle = () => {
    const { clientId, code, profile } = useAppContext();
    const { openError, setOpenError, errorMessage, setErrorMessage } = useShufflePageContext();
    const [ playlists, setPlaylists ] = useState<(Playlist|undefined)[]>([...Array(16)]);
    const [ filterText, setFilterText ] = useState<string>("");

    useEffect(() => {
        // TODO: Paginate playlists (?)
        if (!profile) {
            return;
        }
        fetchUserPlaylists(clientId, code!, profile!.id).then(data => {
            if (data) {
                setPlaylists(data);
            } else {
                setErrorMessage("Eror loading playlists. Try again.");
                setOpenError(true);
            }
        });
    }, [profile]);

    const visiblePlaylists = useMemo(
        () => {
            if (filterText === "") {
                return playlists;
            }
            console.log(`Filtering on ${filterText}`);
            return playlists.filter((playlist) =>
                playlist?.name.toLocaleLowerCase()
                    .includes(filterText.toLocaleLowerCase()) ||
                playlist?.description?.toLocaleLowerCase()
                    .includes(filterText.toLocaleLowerCase())
            );
        },
        [playlists, filterText]
    );

    return (
        <section id="shuffle">
            <Container maxWidth="xl">
                <Grid container>
                    <Grid item xs={0.25} />
                    <Grid item xs={11.5}>
                        <Typography
                            variant="h4"
                            className="title"
                        >
                            Shuffle Playlists
                        </Typography>
                    </Grid>
                    <Grid item xs={0.25} />
                    <Grid item xs={0.25} />
                    <Grid item xs={11.5}>
                        <Typography
                            variant="body1"
                            className="subtitle"
                        >
                            Tired of Spotify "shuffle" playing the same songs over and over? <br />
                            Your job is to fill playlists with good songs. Leave the order to us. <br />
                            Truly randomize your playlist and hear the songs you've been missing. <br />
                        </Typography>
                    </Grid>
                    <Grid item xs={0.25} />
                    <Grid item xs={0.25} />
                    <Grid item xs={11.5} sx={{position: "sticky", zIndex: 1, top: "30px"}}>
                        <Searchbox
                            label="Filter playlists by name"
                            placeholder="Filter playlists by name"
                            text={filterText}
                            setText={setFilterText}
                        />
                    </Grid>
                    <Grid item xs={0.25} />
                    {visiblePlaylists.map((playlist, index) => (
                        <Grid item container
                            key={`playlist-${index}`}
                            justifyContent={"center"}
                            xs={6} sm={4} md={6} lg={4}
                        >
                            <ShufflePlaylistCard playlist={playlist}/>
                        </Grid>
                    ))}
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