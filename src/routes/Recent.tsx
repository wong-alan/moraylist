import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAppContext } from "../contexts/AppContext";
import { fetchPlayHistory } from "../spotify/player";
import PlayHistoryCard from "../components/PlayHistoryCard/PlayHistoryCard";

const Recent = () => {
    const { clientId, code } = useAppContext();
    const [ playHistory, setPlayHistory ] = useState<(PlayHistory|undefined)[]>([...Array(25)]);

    useEffect(() => {
        fetchPlayHistory(clientId, code!, Date.now(), "before").then(data => {
            if (data) {
                setPlayHistory(data);
            } else {
                // TODO: Set error
            }
        });
    }, [code]);

    return (
        <section id="recent">
            <Container maxWidth="xl">
                <Grid container>
                    <Grid item xs={0.25} />
                    <Grid item xs={11.5}>
                        <Typography
                            variant="h4"
                            className="title"
                        >
                            Recently Played
                        </Typography>
                    </Grid>
                    <Grid item xs={0.25} />
                    <Grid item xs={0.25} />
                    <Grid item xs={11.5}>
                        <Typography
                            variant="body1"
                            className="subtitle"
                        >
                            Take a walk down recent memory lane and see what you just listened to. <br />
                            Play it again, or write it down so you never play it again. It's up to you! <br />
                        </Typography>
                    </Grid>
                    <Grid item xs={0.25} />
                    <Grid item container
                        xs={12}
                        justifyContent={"center"}
                    >
                        { playHistory.map((track, index) =>
                            <Grid item container
                                xs={12}
                                key={`track-${index}`}
                            >
                                <PlayHistoryCard
                                    playHistory={track}
                                />
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
}

export default Recent;