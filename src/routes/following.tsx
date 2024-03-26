import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { useAppContext } from "../contexts/AppContext";
import { useFollowPageContext } from "../contexts/FollowPageContext";
import { fetchFollowing } from "../spotify/user";
import ArtistCardContainer from "../components/ArtistCard/ArtistCardContainer";
import ErrorSnack from "../components/ErrorSnack";

// TODO: Animate grid with GSAP Flip (?)

const Following = () => {
    const { clientId, code } = useAppContext();
    const { openError, setOpenError, errorMessage, setErrorMessage } = useFollowPageContext();
    const [ artists, setArtists ] = useState<(Artist|undefined)[]>([...Array(25)]);

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

    return (
        <section id="following">
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
                            Artists You Follow
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
                            Rediscover your followed artists. <br />
                            Not a stan anymore? Drop them like your ex. <br />
                        </Typography>
                    </Grid>
                    <Grid item xs={0.25} />
                    {artists.map((artist, index) => (
                        <ArtistCardContainer
                            key={`artist-${index}`}
                            artist={artist}
                        />
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

export default Following;