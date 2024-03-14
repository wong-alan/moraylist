// LOCAL STORAGE
export const CODE = "code";

export const DEFAULT_TOOLTIP_SX = {
    fontSize: 13,
    fontFamily: "inherit",
    fontWeight: 500
};

export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const toPascalCase = (s: string | null | undefined) =>
    s ? s.replace(/(\w)(\w*)/g, (_, p, q) => p.toUpperCase() + q.toLowerCase()) : s;