import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import { StyledCard, Content } from "./ArtistCardStyles";
import { BASE_SKELETON_SX } from "../../utils";

const ArtistCardSkeleton = () => {
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

export default ArtistCardSkeleton;