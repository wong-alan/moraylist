import { getAccessToken } from "./auth";

const userEndpoint = "https://api.spotify.com/v1/me/playlists";
const playlistEndpoint = "https://api.spotify.com/v1/playlists";

export const fetchUserPlaylists = async (
    clientId: string,
    code: string,
    userId: string
): Promise<Playlist[] | null> => {
    const accessToken = await getAccessToken(clientId, code);
    if (!accessToken) {
        return null;
    }

    let playlistUrl: URL | string | null = new URL(userEndpoint);
    playlistUrl.search = new URLSearchParams({
        limit: "50",
        offset: "0"
    }).toString();

    let usersPlaylists: Playlist[] = [];
    do {
        const result = await fetch(playlistUrl, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const response: Playlists = await result.json();
        usersPlaylists.push(...response.items
            .filter((playlist) => playlist.owner.id == userId));
        playlistUrl = response.next;
    } while (playlistUrl);
    return usersPlaylists;
}

export const reorderPlaylist = async (
    clientId: string,
    code: string,
    playlistId: string,
    fromPos: number,
    toPos: number,
    snapshotId?: string | null // TODO: Don't pass in null. Catch failed request.
): Promise<string | null> => {
    const accessToken = await getAccessToken(clientId, code);
    if (!accessToken) {
        return null;
    }

    const playlistUrl: URL = new URL([playlistEndpoint,playlistId,"tracks"].join("/"));
    const payload: RequestInit = {
        method: 'PUT',
        headers: { Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({
            range_start: fromPos,
            insert_before: toPos,
            range_length: 1,
            ...(snapshotId && {snapshot_id: snapshotId})
        })
    }
    const result = await fetch(playlistUrl, payload);
    if (!result.ok) {
        return null;
    }
    const { snapshot_id } = await result.json();
    return snapshot_id;
}