import { useContext, useEffect, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";

import AppContext from "../contexts/AppContext";
import { fetchUserPlaylists } from "../spotify/playlist";
import { Container } from "@mui/material";

const Shuffle = () => {
    const { clientId, code, profile } = useContext(AppContext);
    const [ playlists, setPlaylists ] = useState<Playlist[] | null>([]);

    useEffect(() => {
        fetchUserPlaylists(clientId, code!, profile!.id).then(data => setPlaylists(data));
    }, []);

    return (
        <section id="shuffle"
            style={{
                display: "flex",
                justifyContent: "space-evenly"
        }}>
            <Container maxWidth="xl">
                {playlists && playlists.length ?
                    (playlists.map((playlist) => (
                        <div key={playlist.name}>
                            <img src={playlist.images[0].url} width={70} />
                            {playlist.name}
                        </div>
                    )))
                    : <CircularProgress sx={{ margin: 20 }}/>
                }
            </Container>
        </section>
    );
}

export default Shuffle;