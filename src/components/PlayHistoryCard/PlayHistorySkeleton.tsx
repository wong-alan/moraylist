import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import { BASE_SKELETON_SX } from "../../utils";

const PlayHistoryCardSkeleton = () => {
    return (
        <Card
            className="history-card skeleton"
        >
            <Skeleton variant="rounded" animation="wave"
                className="history-card-media"
                sx={{
                    ...BASE_SKELETON_SX
                }}
            />
            <CardContent
                className="history-card-content"
            >
                <Box>
                    <Skeleton variant="text" animation="wave"
                        sx={{
                            ...BASE_SKELETON_SX,
                            height: "1.6rem",
                            width: "140px",
                        }}
                    />
                    <Skeleton variant="text" animation="wave"
                        sx={{
                            ...BASE_SKELETON_SX,
                            height: "1.4rem",
                            width: "100px",
                        }}
                    />
                </Box>
                <Box
                    className="history-card-time"
                >
                    <Skeleton variant="text" animation="wave"
                        sx={{
                            ...BASE_SKELETON_SX,
                            height: "1.4rem",
                            width: "110px",
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
}

export default PlayHistoryCardSkeleton;