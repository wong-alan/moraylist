import { Dispatch, SetStateAction } from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import { CSSObject, styled } from "@mui/material/styles";
import {
    Info,
    InfoEyebrow,
    InfoSlotStyles,
    InfoSubtitle,
    InfoTitle,
} from "../../mui-treasury/info-basic";

import UnfollowButton from "../UnfollowButton";
import OpenInAppButton from "../OpenInAppButton";
import { BASE_SKELETON_SX } from "../../utils";
import "./ArtistCard.css";

const useStyles = (): CSSObject & Partial<InfoSlotStyles> => {
    return {
        eyebrow: {
            color: "rgba(255, 255, 255, 0.92)",
            lineHeight: 1.4,
            fontSize: "1.0625rem",
            letterSpacing: "1px",
            textTransform: "initial",
            marginBottom: 0,
        },
        title: {
            color: "#fff",
            fontSize: "1.25rem",
            fontWeight: 600,
            lineHeight: 1.2,
        },
        subtitle: {
            color: "rgba(255, 255, 255, 0.72)",
            lineHeight: 1.5,
            "&:last-child": {
                marginTop: "1rem",
            },
        },
    };
};

const StyledCard = styled(Card)(({theme}) => ({
    borderRadius: "1rem",
    position: "relative",
    maxWidth: 300,
    aspectRatio: "1 / 1.2",
    margin: "0.5vw",
    overflow: "hidden",
    [theme.breakpoints.up("xl")]: {
        margin: "8px"
    }
}));

const Content = styled("div")({
    padding: "12px 15px",
    boxSizing: "border-box",
    position: "absolute",
    zIndex: 2,
    bottom: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    color: "white"
});

interface ArtistCardProps {
    artist: Artist|undefined
    setUnfollow: Dispatch<SetStateAction<boolean>>
}

const ArtistCard = ({artist, setUnfollow}: ArtistCardProps) => {
    if (!artist) {
        return (
            <StyledCard>
                <CardMedia
                    className="artist-card-media"
                    component={"div"}
                    sx={{bgcolor: "#242424"}}
                />
                    <Content className="artist-card-content">
                        <Skeleton variant="text" animation="wave"
                            sx={{
                                ...BASE_SKELETON_SX,
                                width: "75%",
                            }}
                            />
                        <Skeleton variant="text" animation="wave"
                            sx={{
                                ...BASE_SKELETON_SX,
                                width: "90%",
                            }}
                        />
                        <Skeleton variant="rounded" animation="wave"
                            sx={{
                                ...BASE_SKELETON_SX,
                                width: "85px",
                                height: "25px",
                                margin: "5px 0px 10px 0px",
                            }}
                        />
                    </Content>
            </StyledCard>
        );
    }

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
                        <UnfollowButton artistId={artist.id} setUnfollow={setUnfollow} />
                        <OpenInAppButton link={artist.uri}/>
                    </InfoSubtitle>
                </Info>
            </Content>
        </StyledCard>
    );
}

export default ArtistCard;