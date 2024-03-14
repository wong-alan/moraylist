import { useContext, useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import AppContext from "../contexts/AppContext";
import FollowPageContext from "../contexts/FollowPageContext";
import { fetchFollowing } from "../spotify/user";
import ArtistCardContainer from "../components/ArtistCard/ArtistCardContainer";
import ErrorSnack from "../components/ErrorSnack";

// TODO: Animate grid with GSAP Flip (?)

const Following = () => {
    const { clientId, code } = useContext(AppContext);
    const [ artists, setArtists ] = useState<Artist[] | null>([]);
    const [ unfollowError, setUnfollowError ] = useState<boolean>(false);

    useEffect(() => {
        // TODO: Paginate followed artists (?)
        fetchFollowing(clientId, code!).then(data => setArtists(data))
    }, []);

    return (
        <FollowPageContext.Provider value={{ setUnfollowError: setUnfollowError }}>
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
                        {artists && artists.map((artist) => (
                            <ArtistCardContainer
                                key={artist.id}
                                artist={artist}
                            />
                        ))}
                    </Grid>
                </Container>
                <ErrorSnack
                    message={"Failed to unfollow. Try again."}
                    open={unfollowError}
                    setOpen={setUnfollowError}
                />
            </section>
        </FollowPageContext.Provider>
    );
}

export default Following;