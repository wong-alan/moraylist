import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Info, InfoEyebrow, InfoSubtitle, InfoTitle } from "../../mui-treasury/info-basic";
import { decode } from "html-entities";
import ShuffleButton from "../ShuffleButton";
import "./ShufflePlaylistCard.css";

interface ShufflePlaylistCardProps {
  playlist: Playlist
}

const ShufflePlaylistCard = ({playlist}: ShufflePlaylistCardProps) => {
  return (
    <Card raised
      className="playlist-card"
      sx={(_theme) => ({
        margin: "36px 7px 15px 7px",
        borderRadius: "16px",
        transition: "0.3s",
        position: "relative",
        width: "100%",
        maxWidth: 400,
        marginLeft: "auto",
        overflow: "initial",
        background: "#242424",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        aspectRatio: "2.4/1",
        paddingBottom: "10px",
      })}
    >
      <CardMedia
        component="img"
        src={playlist.images[0].url}
        className="playlist-card-media"
        sx={(_theme) => ({
          width: "88%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "-36px",
          borderRadius: "16px",
          position: "relative",
          aspectRatio: "1.45/1",
        })}
      />
      <CardContent
        className="playlist-card-content"
        sx={{
          width: "55%",
          padding: "5px 10px 0px 10px !important", // Override :lastchild
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
      }}>
        <Info
          className="playlist-card-info"
          useStyles={(_theme) => {
            return {
              eyebrow: {
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontSize: "10px",
                fontWeight: 600,
                marginBottom: "0.2em",
                display: "inline-block",
                color: "#9E9E9E"
              },
              title: {
                fontSize: "17px",
                fontWeight: "bold",
                marginBottom: "0.2em",
                color: "#FFFFFF",
                display: "block",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"

              },
              subtitle: {
                marginBottom: "5px",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.00938em",
                color: "#BABABA",
                display: "block",
                height: "calc(100% - (20px + 30px + 30px + 5px))",
                overflowY: "auto",
                scrollbarWidth: "thin",
                scrollbarColor: "#ABABAB #242424",
              },
            };
          }}
        >
          <InfoEyebrow className="playlist-card-eyebrow">{playlist.tracks.total.toLocaleString()} tracks</InfoEyebrow>
          <InfoTitle className="playlist-card-title">{playlist.name}</InfoTitle>
          <InfoSubtitle className="playlist-card-subtitle">
            {decode(playlist.description)}
          </InfoSubtitle>
        </Info>
        <div className="playlist-card-button-container">
          <ShuffleButton playlistId={playlist.id} length={playlist.tracks.total} />
        </div>
      </CardContent>
    </Card>
  );
}

export default ShufflePlaylistCard;