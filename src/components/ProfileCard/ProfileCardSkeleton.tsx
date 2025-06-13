import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import { Info, InfoEyebrow, InfoSubtitle, InfoTitle } from "../../mui-treasury/info-basic";
import { getInfoN03Styles } from "../../mui-treasury/info-n03";
import { BASE_SKELETON_SX, Repeat } from "../../utils";

const ProfileCardSkeleton = () => {
    return (
        <Card
            sx={{
                minWidth: 450,
                maxWidth: 495,
                borderRadius: "20px",
                boxShadow: 24,
                transition: "0.3s",
                margin: "24px",
                bgcolor: "#242424"
            }}
        >
            <Box sx={{ minWidth: 256 }}>
                <Box
                    sx={{
                        padding: `4px 24px 0`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Skeleton variant="circular" animation="wave"
                        width={60} height={60}
                        sx={{
                            ...BASE_SKELETON_SX,
                            transform: "translateY(calc(50% + 8px))",
                        }}
                    />
                    <Skeleton variant="text" animation="wave"
                        width={240} height={25}
                        sx={{ ...BASE_SKELETON_SX, }}
                    />
                </Box>
                <Box
                    component="hr"
                    sx={(theme) => ({
                        backgroundColor: "grey.200",
                        marginBottom: `${24 - 1}px`, // minus 1 due to divider height
                        [theme.breakpoints.up("sm")]: {
                            marginBottom: `${30 - 1}px`, // minus 1 due to divider height
                        },
                    })}
                />
            </Box>
            <CardContent sx={{ padding: "8px 24px 24px 24px" }}>
                <Info useStyles={getInfoN03Styles}>
                    <InfoEyebrow>
                        <Skeleton variant="text" animation="wave"
                            width={117} height={30}
                            sx={{ ...BASE_SKELETON_SX }}
                        />
                    </InfoEyebrow>
                    <InfoTitle sx={{marginBottom: "0.5em"}}>
                        <Skeleton variant="text" animation="wave"
                            width={250} height={36}
                            sx={{ ...BASE_SKELETON_SX }}
                        />
                    </InfoTitle>
                    <InfoSubtitle>
                        <Repeat count={5}>
                            <Skeleton variant="text" animation="wave"
                                width={225} height={30}
                                sx={{ ...BASE_SKELETON_SX }}
                            />
                        </Repeat>
                    </InfoSubtitle>
                </Info>
            </CardContent>
        </Card>
    );
};

export default ProfileCardSkeleton;