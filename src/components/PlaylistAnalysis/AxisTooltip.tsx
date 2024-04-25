import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ChartsAxisContentProps } from "@mui/x-charts/ChartsTooltip";
import { LineSeriesType } from "@mui/x-charts/models/seriesType";
import { attributeMap } from "./AttributeMaps";
import "./AxisTooltip.css";

const AxisTooltip = ({
    series,
    dataIndex,
    axisValue
}: ChartsAxisContentProps) => {
    const track = (axisValue as PlaylistTrack).track as Track;
    const dataSeries = series[0] as LineSeriesType;
    const attributeProps = attributeMap[dataSeries.dataKey!];

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
                    {track.name}
                </Typography>
                <Typography
                    className="analysis-tooltip-track-number"
                    align="right"
                >
                    #{dataIndex! + 1}
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
                    src={track.album.images.at(-1)?.url}
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
                        {attributeProps.label}
                    </Typography>
                    <Typography
                        className="analysis-tooltip-value"
                        align="right"
                    >
                        { dataIndex !== null && dataIndex !== undefined && dataSeries.data ?
                            attributeProps.tooltipFormatter(dataSeries.data[dataIndex])
                            : "?"
                        }
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default AxisTooltip;