import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import OpenInNewOutlined from "@mui/icons-material/OpenInNewOutlined";
import { Info, InfoEyebrow, InfoSubtitle, InfoTitle } from "../../mui-treasury/info-basic";
import { getInfoN03Styles } from "../../mui-treasury/info-n03";
import Emoji, { getFlagEmoji } from "../icons/Emoji";
import { MORAY_SVG } from "../icons/MorayIcon";
import { DEFAULT_TOOLTIP_SX } from "../../utils";
import ProfileCardSkeleton from "./ProfileCardSkeleton";
import OpenInAppButton from "../buttons/OpenInAppButton";

interface ProfileCardProps {
    profile: UserProfile | null
}

export const ProfileCard = ({profile}: ProfileCardProps) => {
    if (!profile) {
        return <ProfileCardSkeleton />;
    }

    const iconSrc: string = profile.images?.at(0)?.url ?? MORAY_SVG;
    const pfpUrl = profile.images?.at(-1)?.url ?? MORAY_SVG;

    return (
        <Card
            sx={{
                width: "100%",
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
                        position: "relative"
                    }}
                >
                    <Avatar
                        alt={"User profile picture"}
                        src={iconSrc}
                        sx={{
                            width: 60,
                            height: 60,
                            transform: "translateY(calc(50% + 8px))", // hr has margin-top: 8px
                            "& > img": {
                                margin: 0,
                                backgroundColor: "common.white",
                            },
                        }}
                    />
                    <Tooltip
                        title="User ID"
                        placement="bottom-end"
                        slotProps={{
                            tooltip: {
                                sx: DEFAULT_TOOLTIP_SX
                            }
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "inherit",
                                fontWeight: 500,
                                fontSize: 14,
                                textTransform: "uppercase",
                                color: "grey.500",
                                letterSpacing: "1px",
                                position: "absolute",
                                right: "20px"
                            }}
                        >
                            {profile.id}
                        </Typography>
                    </Tooltip>
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
                        {profile.product} <Emoji>{getFlagEmoji(profile.country)}</Emoji>
                    </InfoEyebrow>
                    <InfoTitle sx={{marginBottom: "0.5em", color: "white"}}>
                        {profile.display_name ? profile.display_name : "(no display name)"}
                    </InfoTitle>
                    <InfoSubtitle sx={{lineBreak: "anywhere", color: "white"}}>
                        Followers: {profile.followers.total} <br/>
                        Email: {profile.email} <br/>
                        Explicit content: {profile.explicit_content.filter_enabled ? "Not Allowed" : "Allowed"} <br />
                        Explicit content filter: {profile.explicit_content.filter_locked ? "Locked" : "Unlocked"} <br />
                        {pfpUrl != MORAY_SVG &&
                            <Link to={pfpUrl} className="light-link" target="_blank" rel="noopener">
                                Profile Image <OpenInNewOutlined sx={{fontSize: "1rem"}} />
                            </Link>
                        } <br />
                        <OpenInAppButton condensed link={profile.uri}/>
                    </InfoSubtitle>
                </Info>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
