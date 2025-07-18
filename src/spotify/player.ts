import { getAccessToken } from "./auth";

const playHistoryEndpoint = "https://api.spotify.com/v1/me/player/recently-played";

export const fetchPlayHistory = async (
    clientId: string,
    code: string,
    timestamp: number,
    when: "before"|"after",
    limit = 50,

): Promise<PlayHistory[] | null> => {
    const accessToken = await getAccessToken(clientId, code);
    if (!accessToken) {
        return null;
    }

    const playHistoryUrl: URL | string | null = new URL(playHistoryEndpoint);
    playHistoryUrl.search = new URLSearchParams({
        limit: Math.trunc(limit).toString(),
        [when]: Math.trunc(timestamp).toString(),
    }).toString();

    const result = await fetch(playHistoryUrl, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    const response: RecentPlayHistory = await result.json() as RecentPlayHistory;
    return response.items;
};