import { getAccessToken } from "./auth";

const playHistoryEndpoint = "https://api.spotify.com/v1/me/player/recently-played";

export const fetchPlayHistory = async (
    clientId: string,
    code: string,
    timestamp: number,
    when: "before"|"after",
    limit: number = 50,

): Promise<PlayHistoryObject[] | null> => {
    const accessToken = await getAccessToken(clientId, code);
    if (!accessToken) {
        return null;
    }

    let playHistoryUrl: URL | string | null = new URL(playHistoryEndpoint);
    playHistoryUrl.search = new URLSearchParams({
        limit: Math.trunc(limit).toString(),
        [when]: Math.trunc(timestamp).toString(),
    }).toString();

    const result = await fetch(playHistoryUrl, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    const response: PlayHistory = await result.json();
    return response.items;
}