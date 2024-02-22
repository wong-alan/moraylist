import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Info, InfoEyebrow, InfoSubtitle, InfoTitle } from "../../mui-treasury/info-basic";
import { getInfoN03Styles } from "../../mui-treasury/info-n03";
import { Link, Tooltip } from "@mui/material";
import Emoji, { getFlagEmoji } from "../icons/Emoji";
import { OpenInNewOutlined } from "@mui/icons-material";
import { SPLOTCHIFY_SVG } from "../icons/SplotchifyIcon";

interface ProfileCardProps {
  profile: UserProfile
}

export const ProfileCard = ({profile}: ProfileCardProps) => {

  let iconSrc: string;
  if (profile.images.length == 0) {
    iconSrc = SPLOTCHIFY_SVG;
  } else {
    // Sort in descending order of size
    iconSrc = profile.images.sort((a, b) => b.height - a.height)[0].url;
  }

  return (
    <Card
      sx={{
        maxWidth: 495,
        borderRadius: "20px",
        boxShadow: 24,
        transition: "0.3s",
        margin: "24px",
        bgcolor: "#171717"
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
          <Avatar
            alt={"User profile picture"}
            src={iconSrc}
            sx={(theme) => ({
              width: 48,
              height: 48,
              transform: "translateY(50%)",
              "& > img": {
                margin: 0,
                backgroundColor: "common.white",
              },
              [theme.breakpoints.up("sm")]: {
                width: 60,
                height: 60,
              },
            })}
          />
          <Tooltip title="User ID" placement="bottom-end">
            <Typography
              sx={{
                textTransform: "uppercase",
                fontSize: 14,
                color: "grey.500",
                letterSpacing: "1px",
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
          <InfoTitle sx={{marginBottom: "0.5em", color: "white"}}>{profile.display_name ? profile.display_name : "(no display name)"}</InfoTitle>
          <InfoSubtitle sx={{lineBreak: "anywhere", color: "white"}}>
            Followers: {profile.followers.total} <br/>
            Email: {profile.email} <br/>
            Explicit content: {profile.explicit_content.filter_enabled ? "Not Allowed" : "Allowed"} <br />
            Explicit content filter: {profile.explicit_content.filter_locked ? "Locked" : "Unlocked"} <br />
            Spotify URI: <Link href={profile.uri} target="_blank" rel="noopener">
                {profile.uri} <OpenInNewOutlined sx={{fontSize: "1rem"}} />
              </Link> <br/>
            {
              iconSrc != SPLOTCHIFY_SVG &&
                <Link href={iconSrc} target="_blank" rel="noopener" sx={{fontSize: "17px"}}>
                  Profile Image <OpenInNewOutlined sx={{fontSize: "1rem"}} />
                </Link>
            }
          </InfoSubtitle>
        </Info>
      </CardContent>
    </Card>
  );
}
