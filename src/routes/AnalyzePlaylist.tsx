import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useAppContext } from "../contexts/AppContext";
import { useAnalysisPageContext } from "../contexts/AnalysisPageContext";
import { fetchUserPlaylists } from "../spotify/playlist";
import ChipGroup from "../components/ChipGroup";
import PlaylistSelect from "../components/PlaylistSelect/PlaylistSelect";
import PlaylistAnalysis from "../components/PlaylistAnalysis/PlaylistAnalysis";
import { attributeMap } from "../components/PlaylistAnalysis/AttributeMaps";
import ErrorSnack from "../components/ErrorSnack";
import "./filter.css";

const AnalyzePlaylist = () => {
    const { clientId, code, profile } = useAppContext();
    const { openError, setOpenError, errorMessage, setErrorMessage } = useAnalysisPageContext();
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ playlists, setPlaylists ] = useState<Playlist[]>([]);
    const [ selectedPlaylist, setSelectedPlaylist ] = useState<Playlist|null>(null);
    const [ attribute, setAttribute ] = useState<string>(Object.keys(attributeMap)[0]);

    useEffect(() => {
        if (!profile) {
            return;
        }
        fetchUserPlaylists(clientId, code!, profile!.id, false).then(data => {
            if (data) {
                setPlaylists(data);
                setLoading(false);
            } else {
                setErrorMessage("Error loading playlists. Try again.");
                setOpenError(true);
            }
        });
    }, [code, profile]);

    return (
        <section id="analysis">
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
                            Your music playlists are not just collections of songs — they are mirrors reflecting the many facets of your being.<br />
                            Let us delve into the depths of your musical universe and unearth the secrets hidden within.<br />
                        </Typography>
                    </Grid>
                    <Grid item xs={0.25} />
                    <Grid item xs={0.25} />
                    <Grid item xs={11.5}>
                        <ChipGroup
                            labels={attributeMap}
                            selected={attribute}
                            setSelected={setAttribute}
                        />
                    </Grid>
                    <Grid item xs={0.25} />
                    <Grid item xs={0.25} />
                    <Grid item xs={11.5}>
                        <PlaylistSelect
                            playlists={playlists}
                            setValue={setSelectedPlaylist}
                            loading={loading}
                        />
                    </Grid>
                    <Grid item xs={0.25} />
                    { selectedPlaylist &&
                        <>
                        <Grid item xs={0.25} />
                        <Grid item xs={11.5}>
                            <PlaylistAnalysis
                                playlist={selectedPlaylist}
                                attribute={attribute}
                            />
                        </Grid>
                        <Grid item xs={0.25} />
                        </>
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

export default AnalyzePlaylist;