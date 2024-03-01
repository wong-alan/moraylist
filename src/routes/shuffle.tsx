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
        fetchUserPlaylists(clientId, code!, profile!.id).then(data => setPlaylists(data));
    }, []);

    return (
        <section id="shuffle">
            <Container maxWidth="xl">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontFamily: "Metropolis",
                                margin: "30px 0px 10px 10px",
                                width: "fit-content"
                            }}
                        >
                            Shuffle Playlists
                        </Typography>
                    </Grid>
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