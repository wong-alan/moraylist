import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsGrid, chartsGridClasses } from "@mui/x-charts/ChartsGrid";
import { ChartsReferenceLine, referenceLineClasses } from '@mui/x-charts/ChartsReferenceLine';
import { ChartsTooltip, chartsTooltipClasses } from "@mui/x-charts/ChartsTooltip";
import { ChartsAxisHighlight, chartsAxisHighlightClasses } from "@mui/x-charts/ChartsAxisHighlight";
import { LinePlot, MarkPlot, markElementClasses } from "@mui/x-charts/LineChart";
import { fetchAudioFeatures } from "../../spotify/track";
import { fetchPlaylistItems } from "../../spotify/playlist";
import { useAppContext } from "../../contexts/AppContext";
import { useAnalysisPageContext } from "../../contexts/AnalysisPageContext";
import AxisTooltip from "./AxisTooltip";

const EmptySlot = () => {
    return null;
}

interface PlaylistAnalysisProps {
    playlist: Playlist
}

const PlaylistAnalysis = ({playlist}: PlaylistAnalysisProps) => {
    const { clientId, code, profile } = useAppContext();
    const { setOpenError, setErrorMessage } = useAnalysisPageContext();
    const [ trackData, setTrackData ] = useState<PlaylistTrack[] | null>();
    const [ audioFeatures, setAudioFeatures ] = useState<AudioFeatures[]>();

    useEffect(() => {
        // TODO: Fetched playlist item could be null if not available in market
        fetchPlaylistItems(
            clientId, code!, playlist.id, profile!.country,
            "next,items(is_local,track(id,type,name,artists(name),album(images,name)))"
        ).then(trackData => {
            if (trackData) {
                setTrackData(trackData);
                return trackData;
            } else {
                throw new Error("Error fetching track data.");
            }
        }).then(trackData =>
            fetchAudioFeatures(clientId, code!,
                trackData.map((track) => track.track.id)
        )).then(audioFeatures => {
            if (audioFeatures) {
                setAudioFeatures(audioFeatures);
            } else {
                throw new Error("Error fetching audio features.");
            }
        }).catch((error: Error) => {
            setErrorMessage(error.message + " Try again.")
            setOpenError(true);
        });
    }, [playlist])

    if (!trackData || !audioFeatures || trackData.length != audioFeatures.length) {
        return (
            <Box
                sx={{
                    width: "fit-content",
                    margin: "170px auto 0px auto",
                    transform: "translateY(-50%)"
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Paper
            elevation={3}
            sx={{
                width: '100%',
                height: 300,
                marginTop: "20px",
                backgroundColor: "#242424",
                borderRadius: "8px"
            }}
        >
            <ResponsiveChartContainer
                series={[{
                    type: "line",
                    curve: "catmullRom",
                    color: "#2ECC71",
                    dataKey: "danceability",
                    label: "Danceability",
                    highlightScope: { highlighted: "item" },
                    valueFormatter: (value) => (value === null ?
                        "" : (value*100).toFixed(2).toString()),
                }]}
                xAxis={[{
                    data: trackData,
                    scaleType: "point",
                    label: "Tracks",
                    valueFormatter: (value: PlaylistTrack) => (value.track.name)
                }]}
                yAxis={[{
                    label: "Danceability",
                    valueFormatter: (value) => (value*100).toString(),
                    min: 0,
                    max: 1
                }]}
                dataset={audioFeatures as {}[]}
                sx={(theme) => ({
                    [`& .${axisClasses.root} .${axisClasses.line}`] : {
                        stroke: "#FFFFFF"
                    },
                    [`& .${axisClasses.root} .${axisClasses.label}`] : {
                        fill: "#FFFFFF"
                    },
                    [`& .${axisClasses.root}.${axisClasses.bottom} .${axisClasses.label}`] : {
                        transform: "translate(0px, -5.5px)"
                    },
                    [`& .${axisClasses.root}.${axisClasses.left} .${axisClasses.label}`] : {
                        transform: "translate(-4px, 0px)"
                    },
                    [`& .${axisClasses.root} .${axisClasses.tickLabel}`] : {
                        fontFamily: "inherit",
                        fontWeight: "500",
                        fill: "#FFFFFF"
                    },
                    [`& .${chartsGridClasses.root} .${chartsGridClasses.line}`] : {
                        stroke: "rgba(255,255,255,0.2)",
                    },
                    [`& .${referenceLineClasses.root} .${referenceLineClasses.line}`] : {
                        stroke: "rgba(255,0,0,0.5)",
                    },
                    [`& .${markElementClasses.root}.${markElementClasses.highlighted}`] : {
                        fill: "#2ECC71",
                    },
                    [`& .${chartsAxisHighlightClasses.root}`] : {
                        stroke: "rgba(255,255,255,0.5)",
                    },
                    [`& .${chartsTooltipClasses.root} .${chartsTooltipClasses.table}`] : {
                        maxWidth: "250px"
                    },
                    [theme.breakpoints.down("sm")]: {
                        [`& .${markElementClasses.root}`] : {
                            scale: "0.75",
                        },
                    }
                })}
            >
                <ChartsXAxis
                    disableTicks
                    slots={{axisTickLabel: EmptySlot}}
                />
                <ChartsYAxis
                    disableTicks
                />
                <ChartsGrid horizontal />
                <ChartsAxisHighlight x="line" />
                <ChartsReferenceLine
                    y={audioFeatures.reduce((prev, curr) => prev + curr.danceability, 0)/audioFeatures.length}
                />
                <LinePlot />
                <MarkPlot />
                <ChartsTooltip trigger="axis"
                    slots={{ axisContent: AxisTooltip}}
                />
            </ResponsiveChartContainer>
        </Paper>
    );
}

export default PlaylistAnalysis;