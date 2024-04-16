import { useEffect, useState } from "react";

import { useAppContext } from "../contexts/AppContext";
import { fetchPlayHistory } from "../spotify/player";

const Recent = () => {
    const { clientId, code } = useAppContext();
    const [ playHistory, setPlayHistory ] = useState<PlayHistoryObject[]|null>(null);

    useEffect(() => {
        fetchPlayHistory(clientId, code!, Date.now(), "before")
            .then(data => setPlayHistory(data));
    }, []);

    return (
        <section id="recent">
            {playHistory ? playHistory.map((track, index) => {
                return (
                    <div key={`track-${index}`}>
                        {track.track.name} - {track.played_at}
                    </div>
                );
            })
                : "Fetching history..."
            }
        </section>
    );
}

export default Recent;