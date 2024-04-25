import { getAccessToken } from "./auth";
import { uniqueBy } from "../utils";

const userEndpoint = "https://api.spotify.com/v1/me/playlists";
const playlistEndpoint = "https://api.spotify.com/v1/playlists";

export const fetchUserPlaylists = async (
    clientId: string,
    code: string,
    userId: string,
    owned: boolean = true
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
        const items: Playlist[] = owned ?
            response.items.filter((playlist) => playlist.owner.id == userId)
            : response.items;
            usersPlaylists.push(...items);
        playlistUrl = response.next;
    } while (playlistUrl);
    // Spotify is currently returning duplicate playlists
    // https://community.spotify.com/t5/Spotify-for-Developers/Singular-duplicate-in-paginated-current-user-playlists/m-p/5993387
    return uniqueBy(usersPlaylists, (playlist) => playlist.id);
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

export const fetchPlaylistItems = async (
    clientId: string,
    code: string,
    playlistId: string,
    market?: string,
    fields?: string,
): Promise<PlaylistTrack[] | null> => {
    const accessToken = await getAccessToken(clientId, code);
    if (!accessToken) {
        return null;
    }
    const path = ["playlists", playlistId, "tracks"].join("/");
    let playlistTracksUrl: URL | string | null = new URL(path, playlistEndpoint);
    playlistTracksUrl.search = new URLSearchParams({
        ...(market && {market: market}),
        ...(fields && {fields: fields}),
        limit: "50"
    }).toString();

    let tracks: PlaylistTrack[] = [];
    do {
        const result = await fetch(playlistTracksUrl, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const response: Tracks = await result.json();
        tracks.push(...response.items
            .filter((track) => !track.is_local && track.track.type === "track"));
        playlistTracksUrl = response.next;
    } while (playlistTracksUrl);
    return tracks;
}