import { getAccessToken } from "./auth";

const playlistEndpoint = "https://api.spotify.com/v1/me/playlists";

export const fetchUserPlaylists = async (
    clientId: string,
    code: string,
    userId: string
): Promise<Playlist[] | null> => {
    const accessToken = await getAccessToken(clientId, code);
    if (!accessToken) {
        return null;
    }

    let playlistUrl: URL | string | null = new URL(playlistEndpoint);
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