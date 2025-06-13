import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import { BASE_SKELETON_SX } from "../../utils";

const ArtistCardSkeleton = () => {
    return (
        <Card className="artist-card">
            <CardMedia
                className="artist-card-media"
                component={"div"}
                sx={{bgcolor: "#242424"}}
            />
                <CardContent className="artist-card-content">
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
                </CardContent>
        </Card>
    );
};

export default ArtistCardSkeleton;