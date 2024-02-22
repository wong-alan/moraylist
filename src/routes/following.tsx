import { useContext, useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

import AppContext from "../contexts/AppContext";
import FollowPageContext from "../contexts/FollowPageContext";
import { fetchFollowing } from "../spotify/user";
import ArtistCardContainer from "../components/ArtistCard/ArtistCardContainer";
import ErrorSnack from "../components/ErrorSnack";

// TODO: Animate grid with GSAP Flip (?)

const Following = () => {
    const { clientId, code, profile } = useContext(AppContext);
    const [ artists, setArtists ] = useState<Artist[] | null>([]);
    const [ unfollowError, setUnfollowError ] = useState<boolean>(false);

    useEffect(() => {
        fetchFollowing(clientId, code!).then(data => setArtists(data))
    }, []);

    // TODO: AppContext(?) to make Snackbar reusable?

    return (
        <FollowPageContext.Provider value={{ setUnfollowError: setUnfollowError }}>
            <section id="following"
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    maxWidth: "100vw",
                    width: "100%"
                }}>
                <Container maxWidth="xl">
                    <Grid container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={12}>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontFamily: "Metropolis",
                                    margin: "30px 0px 10px 40px"
                                }}
                            >
                                Artists You Follow
                            </Typography>
                        </Grid>
                        {artists && artists.map((artist) => (
                            <ArtistCardContainer
                                key={artist.id}
                                artist={artist}
                            />
                        ))}
                    </Grid>
                </Container>
                <ErrorSnack open={unfollowError} setOpen={setUnfollowError} />
            </section>
        </FollowPageContext.Provider>
    );
}

export default Following;