import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import { BASE_SKELETON_SX } from "../../utils";
import "./TopItemCard.css";

const TopItemSkeleton = () => {
    return (
        <Card className="top-item-card skeleton">
            <Skeleton variant="rounded" animation="wave"
                className="top-item-card-media skeleton"
                sx={{
                    ...BASE_SKELETON_SX,
                    height: "80px",
                    width: "80px",
                    marginLeft: "107px"
                }}
            />
            <CardContent className="top-item-card-content skeleton">
                <Box>
                    <Skeleton variant="text" animation="wave"
                        sx={{
                            ...BASE_SKELETON_SX,
                            height: "2.3rem",
                            width: "230px",
                        }}
                    />
                    <Skeleton variant="text" animation="wave"
                        sx={{
                            ...BASE_SKELETON_SX,
                            height: "1.9rem",
                            width: "120px",
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default TopItemSkeleton;