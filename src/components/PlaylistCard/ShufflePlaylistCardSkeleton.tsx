import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import { Info } from "../../mui-treasury/info-basic";
import { BASE_SKELETON_SX, Repeat } from "../../utils";
import "./ShufflePlaylistCard.css";

const ShufflePlaylistCardSkeleton  = () => {
    return (
        <Card raised className="playlist-card">
            <Skeleton variant="rounded" animation="wave"
                className="playlist-card-media"
                sx={(theme) => ({
                    ...BASE_SKELETON_SX,
                    paddingTop: "78%",
                    [theme.breakpoints.up("md")]: {
                        paddingTop: "40%"
                    }
                })}
            />
            <CardContent
                className="playlist-card-content"
                sx={{
                    width: "55%",
                    padding: "10px 10px 0px 10px !important", // Override :lastchild
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
            }}>
                <Info>
                    <Skeleton variant="text" animation="wave"
                        sx={{
                            ...BASE_SKELETON_SX,
                            width: "100px",
                            marginTop: "-3px",
                        }}
                    />
                    <Skeleton variant="text" animation="wave"
                        sx={(theme) => ({
                            ...BASE_SKELETON_SX,
                            height: "35px",
                            marginTop: "-5px",
                            [theme.breakpoints.up("md")]: {
                                height: "38px",
                            }
                        })}
                    />
                    <Repeat count={2}>
                        <Skeleton variant="text" animation="wave"
                            sx={(theme) => ({
                                ...BASE_SKELETON_SX,
                                display: "none",
                                [theme.breakpoints.up("md")]: {
                                    display: "block",
                                    marginTop: "-5px"
                                }
                            })}
                        />
                    </Repeat>
                </Info>
                <div className="playlist-card-button-container">
                    <Skeleton variant="rounded" animation="wave"
                        sx={{
                            ...BASE_SKELETON_SX,
                            width: "85px",
                            height: "28px",
                        }}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default ShufflePlaylistCardSkeleton;