interface AnalysisProps {
    label: string,
    axisY: {
        min?: number,
        max?: number,
        formatter?: (value: any) => string
    },
    dataFormatter: (value: any) => string,
    tooltipFormatter: (value: any) => string,
}

export const attributeMap: Record<string, AnalysisProps> = {
    "danceability": {
        label: "Danceability",
        axisY: {
            min: 0,
            max: 1,
            formatter: (value) => (value*100).toString()
        },
        dataFormatter: (value) => (value*100).toFixed(2),
        tooltipFormatter: (value) => (value*100).toFixed(2),
    },
    "tempo": {
        label: "Tempo",
        axisY: {
            min: 0,
            max: 220,
        },
        dataFormatter: (value) => value,
        tooltipFormatter: (value) => value.toFixed(0) + " BPM",
    },
    "valence": {
        label: "Mood",
        axisY: {
            min: 0,
            max: 1,
            formatter: (value) => (value*100).toString()
        },
        dataFormatter: (value) => (value*100).toFixed(2),
        tooltipFormatter: (value) => (value*100).toFixed(2),
    },
    "energy": {
        label: "Energy",
        axisY: {
            min: 0,
            max: 1,
            formatter: (value) => (value*100).toString()
        },
        dataFormatter: (value) => (value*100).toFixed(2),
        tooltipFormatter: (value) => (value*100).toFixed(2),
    },
    "release_year": {
        label: "Release",
        axisY: {
            formatter: (value) => value.toString()
        },
        dataFormatter: (value) => value.toString(),
        tooltipFormatter: (value) => value.toString()
    }
};