import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
    Info,
    InfoEyebrow,
    InfoSubtitle,
    InfoTitle,
} from "../../mui-treasury/info-basic";
import UnfollowButton from "../buttons/UnfollowButton";
import ArtistCardSkeleton from "./ArtistCardSkeleton";
import "./ArtistCard.css";

interface ArtistCardProps {
    artist: Artist | undefined,
    onUnfollow: () => void
}

const ArtistCard = ({artist, onUnfollow}: ArtistCardProps) => {
    if (!artist) {
        return <ArtistCardSkeleton />
    }

    return (
        <Card raised className="artist-card">
            <CardMedia
                className="artist-card-media"
                component="img"
                loading="lazy"
                alt={`Artist image: ${artist.name}`}
                src={artist.images[1]?.url ?? artist.images[0].url}
            />
            <CardContent
                className="artist-card-content"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
            }}>
                <Info
                    className="artist-card-info"
                    useStyles={(_theme) => {
                        return {
                            eyebrow: {
                                textTransform: "none",
                                letterSpacing: "1px",
                                fontSize: "13px",
                                fontWeight: 600,
                                marginBottom: "0.2em",
                                display: "inline-block",
                                color: "#9E9E9E",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            },
                            title: {
                                fontSize: "17px",
                                fontWeight: "bold",
                                marginBottom: "0.2em",
                                color: "#FFFFFF",
                                display: "block",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"

                            },
                            subtitle: {
                                marginBottom: "5px",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                letterSpacing: "0.00938em",
                                color: "#BABABA",
                                display: "block",
                            },
                        };
                    }}
                >
                    <InfoEyebrow className="artist-card-eyebrow">
                        {artist.followers.total.toLocaleString()} Followers
                    </InfoEyebrow>
                    <InfoTitle className="artist-card-title">
                        <Link to={artist.uri} className="link-style hover-underline">
                            {artist.name}
                        </Link>
                    </InfoTitle>
                    <InfoSubtitle className="artist-card-subtitle">
                        <UnfollowButton artistId={artist.id} onUnfollow={onUnfollow} />
                    </InfoSubtitle>
                </Info>
            </CardContent>
        </Card>
    );
}

export default ArtistCard;