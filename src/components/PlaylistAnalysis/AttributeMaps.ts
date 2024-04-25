interface AnalysisProps {
    label: string,
    axisY: {
        min: number,
        max: number,
        formatter?: (value: any) => string
    },
    dataFormatter?: (value: any) => string,
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
        dataFormatter: (value) => (value*100).toFixed(2).toString(),
        tooltipFormatter: (value) => (value*100).toFixed(2).toString(),
    },
    "tempo": {
        label: "Tempo",
        axisY: {
            min: 0,
            max: 220,
        },
        tooltipFormatter: (value) => value.toFixed(0) + " BPM",
    }
};