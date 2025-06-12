import { Fragment } from "react";
import { SystemStyleObject } from "@mui/system";

// LOCAL STORAGE
export const CODE = "code";

export const DEFAULT_TOOLTIP_SX: SystemStyleObject = {
    fontSize: 13,
    fontFamily: "inherit",
    fontWeight: 500
};

export const BASE_SKELETON_SX: SystemStyleObject = {
    bgcolor: "#363636",
    '&::after': {
        background: "linear-gradient(to right, transparent, rgba(72,72,72,1), transparent)",
    },
};

// Fix for sticky hover styles on mobile
export const noFullHover = (): boolean => {
    return window.matchMedia("(hover:none), (hover:on-demand)").matches;
}

export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const toPascalCase = (s: string | null | undefined) => {
    return s ? s.replace(/(\w)(\w*)/g, (_, p, q) => p.toUpperCase() + q.toLowerCase()) : s;
}

export const normalize = (s: string|undefined): string|undefined => {
    return s?.normalize("NFKD")
        .replace(/\p{Diacritic}/gu, "")
        .toLocaleLowerCase();
}

export const uniqueBy = <T,>(
    array: T[],
    key: (val: T) => unknown
): T[] => {
    return [
        ...new Map(
            array.map(x => [key(x), x])
        ).values()
    ]
}

interface RepeatProps {
    count: number
    children: React.JSX.Element
}

export const Repeat = ({count, children}: RepeatProps): React.JSX.Element[] => {
    return [...Array(count)].map((_, i) => (
        <Fragment key={i}>{children}</Fragment>
    ));
};