import CardMedia from "@mui/material/CardMedia";
import {
    Info,
    InfoEyebrow,
    InfoSubtitle,
    InfoTitle,
} from "../../mui-treasury/info-basic";
import { StyledCard, Content, useStyles } from "./ArtistCardStyles";
import UnfollowButton from "../UnfollowButton";
import OpenInAppButton from "../OpenInAppButton";
import "./ArtistCard.css";

interface ArtistCardProps {
    artist: Artist,
    onUnfollow: () => void
}

const ArtistCard = ({artist, onUnfollow}: ArtistCardProps) => {
    return (
        <StyledCard
            className="artist-card"
            sx={{ boxShadow: 24 }}
        >
            <CardMedia
                className="artist-card-media"
                component="img"
                alt={artist.name}
                image={artist.images[1]?.url ?? artist.images[0].url}
            />
            <Content className="artist-card-content">
                <Info
                    useStyles={useStyles}
                >
                    <InfoEyebrow
                        sx={{
                            fontSize: "0.9em",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                        }}>
                        {artist.followers.total.toLocaleString()} Followers
                    </InfoEyebrow>
                    <InfoTitle
                        sx={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            margin: "0 0 0.1em 0"
                        }}
                    >
                        {artist.name}
                    </InfoTitle>
                    <InfoSubtitle
                        sx={{
                            marginTop: "0 !important",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <UnfollowButton artistId={artist.id} onUnfollow={onUnfollow} />
                        <OpenInAppButton link={artist.uri}/>
                    </InfoSubtitle>
                </Info>
            </Content>
        </StyledCard>
    );
}

export default ArtistCard;