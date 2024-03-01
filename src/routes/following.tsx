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
        fetchFollowing(clientId, code!).then(data => setArtists(data))
    }, []);

    return (
        <FollowPageContext.Provider value={{ setUnfollowError: setUnfollowError }}>
            <section id="following">
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