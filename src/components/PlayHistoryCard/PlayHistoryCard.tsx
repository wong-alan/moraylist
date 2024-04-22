import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ExplicitRounded from "@mui/icons-material/ExplicitRounded";
import PlayHistoryCardSkeleton from "./PlayHistorySkeleton";
import "./PlayHistoryCard.css";

const dateTimeFormat = Intl.DateTimeFormat(
    undefined, {
        dateStyle: "short",
        timeStyle: "short",
    }
);

interface PlayHistoryCardProps {
    playHistory: PlayHistory|undefined
}

const PlayHistoryCard = ({playHistory}: PlayHistoryCardProps) => {
    if (!playHistory) {
        return <PlayHistoryCardSkeleton />
    }

    return (
        <Card
            className="history-card"
            onClick={ ()=> window.location.href = playHistory.track.uri }
        >
            <CardMedia
                className="history-card-media"
                component="img"
                loading="lazy"
                src={playHistory.track.album.images.at(-1)?.url}
                alt={`Album: ${playHistory.track.album.name}`}
            />
            <CardContent className="history-card-content">
                <Box>
                    <Typography className="history-card-track">
                        { playHistory.track.name }
                    </Typography>
                    <Typography className="history-card-artist">
                        { playHistory.track.explicit && <ExplicitRounded /> }
                        { playHistory.track.artists
                            .map<React.ReactNode>((artist, index) =>
                                <a
                                    className="link-style hover-underline"
                                    key={`artist-${index}`}
                                    href={artist.uri}
                                >
                                    {artist.name}
                                </a>)
                            .reduce((prev, curr) => [prev, ", ", curr])
                        }
                    </Typography>
                </Box>
                <Box className="history-card-time">
                    <Typography>
                        { dateTimeFormat.format(Date.parse(playHistory.played_at)) }
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default PlayHistoryCard;