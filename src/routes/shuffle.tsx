import { useContext, useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import AppContext from "../contexts/AppContext";
import { fetchUserPlaylists } from "../spotify/playlist";
import ShufflePlaylistCard from "../components/PlaylistCard/ShufflePlaylistCard";

const Shuffle = () => {
    const { clientId, code, profile } = useContext(AppContext);
    const [ playlists, setPlaylists ] = useState<Playlist[] | null>([]);

    useEffect(() => {
        // TODO: Paginate playlists (?)
        fetchUserPlaylists(clientId, code!, profile!.id).then(data => setPlaylists(data));
    }, []);

    return (
        <section id="shuffle">
            <Container maxWidth="xl">
                <Grid container spacing={1}>
                    <Grid item xs={0.25} />
                    <Grid item xs={11.5}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontFamily: "inherit",
                                fontWeight: 600,
                                margin: "30px 0px 0px 0px",
                                width: "fit-content"
                            }}
                        >
                            Shuffle Playlists
                        </Typography>
                    </Grid>
                    <Grid item xs={0.25} />
                    <Grid item xs={0.25} />
                    <Grid item xs={11.5}>
                        <Typography
                            variant="body1"
                            sx={{
                                fontFamily: "inherit",
                                fontWeight: 500,
                                margin: "0px 0px 10px 0px",
                                width: "fit-content"
                            }}
                        >
                            Tired of Spotify "shuffle" playing the same songs over and over? <br />
                            Your job is to fill playlists with good songs. Leave the order to us. <br />
                            Truly randomize your playlist and hear the songs you've been missing. <br />
                        </Typography>
                    </Grid>
                    <Grid item xs={0.25} />
                    {playlists && playlists.length ?
                        (playlists.map((playlist) => (
                            <Grid
                                item container
                                justifyContent={"center"}
                                key={playlist.name}
                                xs={6} sm={4} md={6} lg={4}
                            >
                                <ShufflePlaylistCard playlist={playlist}/>
                            </Grid>
                        )))
                        : <Grid item container xs={12} justifyContent={"center"}>
                            <CircularProgress sx={{ margin: 20 }}/>
                        </Grid>
                    }
                </Grid>
            </Container>
            {/* <ErrorSnack open={unfollowError} setOpen={setUnfollowError} /> */}
        </section>
    );
}

export default Shuffle;