import { useEffect, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useAppContext } from "../contexts/AppContext";
import { useFollowPageContext } from "../contexts/FollowPageContext";
import { fetchFollowing } from "../spotify/user";
import FollowedArtistGrid from "../components/following/FollowedArtistGrid";
import Searchbox from "../components/Searchbox/Searchbox";
import NoResults from "../components/NoResults";
import ErrorSnack from "../components/ErrorSnack";
import { normalize } from "../utils";

// TODO: Animate filter with GSAP Flip

const Following = () => {
    const { clientId, code } = useAppContext();
    const { openError, setOpenError, errorMessage, setErrorMessage } = useFollowPageContext();
    const [ artists, setArtists ] = useState<(Artist|undefined)[]>([...Array(25)]);
    const [ filterText, setFilterText ] = useState<string>("");

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

    const visibleArtists = useMemo(
        () => {
            const normalizedFilter = normalize(filterText)!.trim();
            if (normalizedFilter === "") {
                return artists;
            }
            return artists.filter((artist) =>
                normalize(artist?.name)?.includes(normalizedFilter))
        },
        [artists, filterText]
    );

    return (
        <section id="following">
            <Container maxWidth="xl">
                <Grid container>
                    <Grid item xs={0.25} />
                    <Grid item xs={11.5}>
                        <Typography
                            variant="h4"
                            className="title"
                        >
                            Artists You Follow
                        </Typography>
                    </Grid>
                    <Grid item xs={0.25} />
                    <Grid item xs={0.25} />
                    <Grid item xs={11.5}>
                        <Typography
                            variant="body1"
                            className="subtitle"
                        >
                            Rediscover your followed artists. <br />
                            Not a stan anymore? Drop them like your ex. <br />
                        </Typography>
                    </Grid>
                    <Grid item xs={0.25} />
                    <Grid item xs={0.25} />
                    <Grid item xs={11.5} sx={{position: "sticky", zIndex: 10, top: "30px"}}>
                        <Searchbox
                            label="Filter artists by name"
                            placeholder="Filter artists by name"
                            text={filterText}
                            setText={setFilterText}
                        />
                    </Grid>
                    <Grid item xs={0.25} />
                    { visibleArtists.length ?
                        <FollowedArtistGrid artists={visibleArtists}/>
                    : <Grid item xs={12}>
                        <NoResults input={filterText} />
                    </Grid>
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

export default Following;