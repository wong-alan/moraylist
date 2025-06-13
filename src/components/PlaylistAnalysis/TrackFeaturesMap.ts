interface AnalysisProps {
    label: string,
    axisY: {
        min?: number,
        max?: number,
        formatter?: (value: number | null) => string
    },
    dataFormatter: (value: number | null) => string,
    tooltipFormatter: (value: number | null) => string,
}

const formatNull = (value: number | null) => {
    return value ? null : "-1";
};
// PlaylistAnalysis only charts numerical data
// Keys should only map to numerical fields
export const trackFeaturesMap: Record<string, AnalysisProps> = {
    "danceability": {
        label: "Danceability",
        axisY: {
            min: 0,
            max: 1,
            formatter: (value) => formatNull(value) ?? (value!*100).toString(),
        },
        dataFormatter: (value) => formatNull(value) ?? (value!*100).toFixed(2),
        tooltipFormatter: (value) => formatNull(value) ?? (value!*100).toFixed(2),
    },
    "tempo": {
        label: "Tempo",
        axisY: {
            min: 0,
            max: 220,
        },
        dataFormatter: (value) => formatNull(value) ?? value!.toString(),
        tooltipFormatter: (value) => formatNull(value) ?? value!.toFixed(0) + " BPM",
    },
    "valence": {
        label: "Mood",
        axisY: {
            min: 0,
            max: 1,
            formatter: (value) => formatNull(value) ?? (value!*100).toString(),
        },
        dataFormatter: (value) => formatNull(value) ?? (value!*100).toFixed(2),
        tooltipFormatter: (value) => formatNull(value) ?? (value!*100).toFixed(2),
    },
    "energy": {
        label: "Energy",
        axisY: {
            min: 0,
            max: 1,
            formatter: (value) => formatNull(value) ?? (value!*100).toString(),
        },
        dataFormatter: (value) => formatNull(value) ?? (value!*100).toFixed(2),
        tooltipFormatter: (value) => formatNull(value) ?? (value!*100).toFixed(2),
    },
    "popularity": {
        label: "Popularity",
        axisY: {
            min: 0,
            max: 100,
            formatter: (value) => formatNull(value) ?? value!.toString(),
        },
        dataFormatter: (value) => formatNull(value) ?? value!.toString(),
        tooltipFormatter: (value) => formatNull(value) ?? value!.toString(),
    },
    "release_year": {
        label: "Release",
        axisY: {
            formatter: (value) => formatNull(value) ?? value!.toString(),
        },
        dataFormatter: (value) => formatNull(value) ?? value!.toString(),
        tooltipFormatter: (value) => formatNull(value) ?? value!.toString(),
    }
};