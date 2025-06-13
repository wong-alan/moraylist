interface TopItemsProps {
    label: string,
}

export const topItemsTypeMap: Record<string, TopItemsProps> = {
    "tracks": {
        label: "Tracks",
    },
    "artists": {
        label: "Artists",
    },
};

export const topItemsTimeMap: Record<string, TopItemsProps> = {
    "short_term": {
        label: "4 weeks",
    },
    "medium_term": {
        label: "6 months",
    },
    "long_term": {
        label: "1 year",
    },
};