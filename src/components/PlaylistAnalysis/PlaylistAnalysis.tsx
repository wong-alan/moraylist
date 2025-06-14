import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsGrid, chartsGridClasses } from "@mui/x-charts/ChartsGrid";
import { ChartsReferenceLine, referenceLineClasses } from '@mui/x-charts/ChartsReferenceLine';
import { chartsTooltipClasses, ChartsTooltipContainer } from "@mui/x-charts/ChartsTooltip";
import { ChartsAxisHighlight, chartsAxisHighlightClasses } from "@mui/x-charts/ChartsAxisHighlight";
import { LinePlot, MarkPlot, lineElementClasses, markElementClasses } from "@mui/x-charts/LineChart";
import { fetchAudioFeatures } from "../../spotify/track";
import { fetchPlaylistItems } from "../../spotify/playlist";
import { useAppContext } from "../../contexts/AppContext";
import { useAnalysisPageContext } from "../../contexts/AnalysisPageContext";
import { trackFeaturesMap } from "./TrackFeaturesMap";
import TrackTooltip from "./TrackTooltip";
import { noFullHover } from "../../utils";
import OpenInAppButton from "../buttons/OpenInAppButton";
import "./PlaylistAnalysis.css";

const EmptySlot = () => {
    return null;
};

interface PlaylistAnalysisProps {
    playlist: Playlist,
    attribute: string
}

type ChartData = AudioFeatures & {
    popularity: number,
    release_year: number
}

const PlaylistAnalysis = ({playlist, attribute}: PlaylistAnalysisProps) => {
    const { clientId, code, profile } = useAppContext();
    const { setOpenError, setErrorMessage } = useAnalysisPageContext();
    const [ trackData, setTrackData ] = useState<PlaylistTrack[] | null>();
    const [ audioFeatures, setAudioFeatures ] = useState<AudioFeatures[] | null>();
    const [ chartData, setChartData ] = useState<ChartData[] | null>();

    useEffect(() => {
        setTrackData(null);
        setAudioFeatures(null);
        setChartData(null);
        // TODO: Fetched playlist item could be null if not available in market
        fetchPlaylistItems(
            clientId, code!, playlist.id, profile!.country,
            "next,items(is_local,track(id,type,name,artists(name),popularity,album(images,name,release_date)))"
        ).then(trackData => {
            if (trackData) {
                const filteredTracks = trackData.filter((track) => track.track.type === "track");
                setTrackData(filteredTracks);
                return filteredTracks;
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
            setErrorMessage(error.message + " Try again.");
            setOpenError(true);
        });
    }, [playlist]);

    useEffect(() => {
        if (!trackData || !audioFeatures || audioFeatures.length != trackData.length) return;

        setChartData(audioFeatures.map((feat, index) => {
            return {
                release_year: +(trackData[index].track as Track).album.release_date.substring(0, 4),
                popularity: (trackData[index].track as Track).popularity,
                ...feat,
            };
        }));
    }, [audioFeatures]);

    if (!trackData || !audioFeatures || !chartData || trackData.length != audioFeatures.length) {
        return (
            <Box
                sx={{
                    width: "fit-content",
                    margin: "170px auto 0px auto",
                    transform: "translateY(-50%)"
                }}
            >
                <CircularProgress color="spotify" />
            </Box>
        );
    }

    const trackFeatures = trackFeaturesMap[attribute];

    return (
        <Paper
            className="playlist-analysis-card"
            elevation={3}
            sx={{
                width: '100%',
                height: 300,
                marginTop: "20px",
                backgroundColor: "#242424",
                borderRadius: "8px"
            }}
        >
            <ChartContainer
                series={[{
                    type: "line",
                    curve: "catmullRom",
                    color: "#2ECC71",
                    dataKey: attribute,
                    label: trackFeatures.label,
                    highlightScope: { highlight: "item" },
                    valueFormatter: trackFeatures.tooltipFormatter,
                }]}
                xAxis={[{
                    data: trackData,
                    scaleType: "point",
                    label: "Tracks",
                    valueFormatter: (value: PlaylistTrack) => (value.track.name)
                }]}
                yAxis={[{
                    label: trackFeatures.label,
                    valueFormatter: trackFeatures.axisY.formatter,
                    min: trackFeatures.axisY.min,
                    max: trackFeatures.axisY.max,
                    ...(!!trackFeatures.axisY.minStep && {tickMinStep: trackFeatures.axisY.minStep}),
                }]}
                dataset={chartData as {}[]}  // eslint-disable-line @typescript-eslint/no-empty-object-type
                sx={(theme) => ({
                    [`& .${axisClasses.root} .${axisClasses.line}`] : {
                        stroke: "#FFFFFF"
                    },
                    [`& .${axisClasses.root} .${axisClasses.label}`] : {
                        fill: "#FFFFFF"
                    },
                    [`& .${axisClasses.root}.${axisClasses.bottom} .${axisClasses.label}`] : {
                        transform: "translate(0px, -6px)"
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
                    [`& .${lineElementClasses.root}`] : {
                        pointerEvents: "none",
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
                            transition: "r 0.5s ease-in-out ",
                            r: `${5 * 0.75}`, // Default marker radius is 5
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
                    y={chartData.reduce((prev, curr) =>
                        prev + (curr[attribute as keyof ChartData] as number), 0) / chartData.length
                    }
                />
                <LinePlot skipAnimation={noFullHover()} />
                <MarkPlot />
                <ChartsTooltipContainer trigger="axis">
                    <TrackTooltip />
                </ChartsTooltipContainer>
            </ChartContainer>
            <OpenInAppButton
                className="playlist-analysis-app-button"
                link={playlist.uri}
            />
        </Paper>
    );
};

export default PlaylistAnalysis;