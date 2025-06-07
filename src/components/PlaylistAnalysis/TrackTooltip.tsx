import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./TrackTooltip.css";
import { MORAY_SVG } from "../icons/MorayIcon";
import { useAxesTooltip } from "@mui/x-charts";

const TrackTooltip = () => {
    const tooltipData = useAxesTooltip();
    const axisData = tooltipData?.[0]; // x-axis
    if (!axisData) {
        return null;
    }
    const track = ((axisData.axisValue as unknown) as PlaylistTrack).track as Track;
    const trackData = axisData.seriesItems[0];

    return (
        <Card
            className="analysis-tooltip-card"
            raised
        >
            <Box className="analysis-tooltip-head">
                <Typography
                    className="analysis-tooltip-track-name"
                    noWrap
                >
                    {axisData.axisFormattedValue}
                </Typography>
                <Typography
                    className="analysis-tooltip-track-number"
                    align="right"
                >
                    #{axisData.dataIndex + 1}
                </Typography>

            </Box>
            <Box
                component="hr"
                className="analysis-tooltip-divider"
            />
            <CardContent className="analysis-tooltip-body">
                <CardMedia
                    className="analysis-tooltip-media"
                    component={"img"}
                    loading="lazy"
                    src={track.album?.images?.at(-1)?.url ?? MORAY_SVG}
                />
                <Box className="analysis-tooltip-details">
                    <Typography
                        className="analysis-tooltip-artist"
                        noWrap
                    >
                        {track.artists.map(artist => artist.name).join(", ")}
                    </Typography>
                    <Typography
                        className="analysis-tooltip-attribute"
                    >
                        {trackData.formattedLabel}
                    </Typography>
                    <Typography
                        className="analysis-tooltip-value"
                        align="right"
                    >
                        {trackData.formattedValue}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default TrackTooltip;