// LOCAL STORAGE
export const CODE = "code";

export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
}