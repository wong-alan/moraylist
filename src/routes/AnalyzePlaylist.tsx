import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useAppContext } from "../contexts/AppContext";
import { useShufflePageContext } from "../contexts/ShufflePageContext";
import { fetchUserPlaylists } from "../spotify/playlist";
import PlaylistSelect from "../components/PlaylistSelect/PlaylistSelect";
import ErrorSnack from "../components/ErrorSnack";
import "./filter.css";

const AnalyzePlaylist = () => {
    const { clientId, code, profile } = useAppContext();
    const { openError, setOpenError, errorMessage, setErrorMessage } = useShufflePageContext();
    const [ playlists, setPlaylists ] = useState<Playlist[]>([]);

    useEffect(() => {
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
    }, [code, profile]);

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
                            Analyze Playlists
                        </Typography>
                    </Grid>
                    <Grid item xs={0.25} />
                    <Grid item xs={0.25} />
                    <Grid item xs={11.5}>
                        <Typography
                            variant="body1"
                            className="subtitle"
                        >
                            Your music playlists are not just collections of songs — they are mirrors reflecting the many facets of your being <br />
                            Let us delve into the depths of your musical universe and unearth the secrets hidden within. <br />
                        </Typography>
                    </Grid>
                    <Grid item xs={0.25} />
                    <Grid item xs={0.25} />
                    <Grid item xs={11.5}>
                        <PlaylistSelect
                            playlists={playlists}
                        />
                    </Grid>
                    <Grid item xs={0.25} />
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

export default AnalyzePlaylist;