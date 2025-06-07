import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAppContext } from "../contexts/AppContext";
import { fetchPlayHistory } from "../spotify/player";
import PlayHistoryCard from "../components/PlayHistoryCard/PlayHistoryCard";
import ErrorSnack from "../components/ErrorSnack";
import { useRecentPageContext } from "../contexts/RecentPageContext";

const Recent = () => {
    const { clientId, code } = useAppContext();
    const { openError, setOpenError, errorMessage, setErrorMessage } = useRecentPageContext();
    const [ playHistory, setPlayHistory ] = useState<(PlayHistory|undefined)[]>([...Array(25)]);

    useEffect(() => {
        fetchPlayHistory(clientId, code!, Date.now(), "before").then(data => {
            if (data) {
                setPlayHistory(data);
            } else {
                setErrorMessage("Eror loading history. Try again.");
                setOpenError(true);
            }
        });
    }, [code]);

    return (
        <section id="recent">
            <Container maxWidth="xl">
                <Grid container>
                    <Grid size={{ xs: 0.25}} />
                    <Grid size={{ xs: 11.5}}>
                        <Typography
                            variant="h4"
                            className="title"
                        >
                            Recently Played
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 0.25}} />
                    <Grid size={{ xs: 0.25}} />
                    <Grid size={{ xs: 11.5}}>
                        <Typography
                            variant="body1"
                            className="subtitle"
                        >
                            Take a walk down recent memory lane and see what you just listened to. <br />
                            Play it again, or write it down so you never play it again. It's up to you! <br />
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 0.25}} />
                    <Grid container
                        size={{ xs: 12 }}
                        justifyContent={"center"}
                    >
                        { playHistory.length ?
                            playHistory.map((track, index) =>
                                <Grid container
                                    size={{ xs: 12 }}
                                    key={`track-${index}`}
                                >
                                    <PlayHistoryCard
                                        playHistory={track}
                                    />
                                </Grid>)
                            : <Grid size={{ xs: 12}}>
                                <Typography
                                    variant="h6"
                                    className="metro-font"
                                    sx={{
                                        width: "fit-content",
                                        margin: "10vh auto 0px auto"
                                    }}
                                >
                                    You haven't played any songs yet!
                                </Typography>
                            </Grid>
                        }
                    </Grid>
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

export default Recent;