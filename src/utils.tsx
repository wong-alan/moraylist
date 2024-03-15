import { SxProps, Theme } from "@mui/material";

// LOCAL STORAGE
export const CODE = "code";

export const DEFAULT_TOOLTIP_SX: SxProps<Theme> = {
    fontSize: 13,
    fontFamily: "inherit",
    fontWeight: 500
};

export const BASE_SKELETON_SX: SxProps<Theme> = {
    bgcolor: "#363636",
    '&::after': {
        background: "linear-gradient(to right, transparent, rgba(72,72,72,1), transparent)",
    },
};

export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const toPascalCase = (s: string | null | undefined) =>
    s ? s.replace(/(\w)(\w*)/g, (_, p, q) => p.toUpperCase() + q.toLowerCase()) : s;