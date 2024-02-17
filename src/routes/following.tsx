import { useContext, useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import AppContext from "../AppContext";
import { fetchFollowing } from "../spotify/user";
import { ArtistCard } from "../components/ArtistCard";
import { Typography } from "@mui/material";

const Following = () => {
    const { clientId, code } = useContext(AppContext);
    const [ following, setFollowing ] = useState<Artist[] | null>([]);

    useEffect(() => {
        fetchFollowing(clientId, code!).then(data => setFollowing(data))
    }, []);

    return (
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
                    {following && following.map((artist) => (
                        <Grid item key={artist.id}>
                            <ArtistCard artist={artist}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </section>
    );
}

export default Following;