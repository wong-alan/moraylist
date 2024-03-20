import { Fragment } from "react";
import { Theme } from "@mui/material/styles";
import { SystemStyleObject } from "@mui/system";

// LOCAL STORAGE
export const CODE = "code";

export const DEFAULT_TOOLTIP_SX: SystemStyleObject = {
    fontSize: 13,
    fontFamily: "inherit",
    fontWeight: 500
};

export const BASE_SKELETON_SX: SystemStyleObject<Theme> = {
    bgcolor: "#363636",
    '&::after': {
        background: "linear-gradient(to right, transparent, rgba(72,72,72,1), transparent)",
    },
};

export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const toPascalCase = (s: string | null | undefined) => {
    return s ? s.replace(/(\w)(\w*)/g, (_, p, q) => p.toUpperCase() + q.toLowerCase()) : s;
}

interface RepeatProps {
    count: number
    children: JSX.Element
}

export const Repeat = ({count, children}: RepeatProps): JSX.Element[] => {
    return [...Array(count)].map((_, i) => (
        <Fragment key={i}>{children}</Fragment>
    ));
};