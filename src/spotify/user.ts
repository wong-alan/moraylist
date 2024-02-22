import { getAccessToken } from "./auth";

const userEndpoint = "https://api.spotify.com/v1/me"
const followingEndpoint = userEndpoint + "/following";

export const fetchProfile = async (clientId: string, code: string): Promise<UserProfile | null> => {
    const accessToken = await getAccessToken(clientId, code);
    if (!accessToken) {
        return null;
    }

    const result = await fetch(userEndpoint, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    const profile: UserProfile = await result.json();
    return profile;
}

export const fetchFollowing = async (clientId: string, code: string, after?: string): Promise<Artist[] | null> => {
    const accessToken = await getAccessToken(clientId, code);
    if (!accessToken) {
        return null;
    }

    let followingUrl: URL | string | null = new URL(followingEndpoint);
    followingUrl.search = new URLSearchParams({
        type: "artist",
        ...(after && {after: after}),
        limit: "50"
    }).toString();

    let followingArtists: Artist[] = [];
    do {
        const result = await fetch(followingUrl!, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const response: Artists = await result.json();
        followingArtists.push(...response.artists.items);
        followingUrl = response.artists.next;
    } while (followingUrl);

    return followingArtists;
}

export const unfollowArtist = async (clientId: string, code: string, artistId: string): Promise<boolean> => {
    const accessToken = await getAccessToken(clientId, code);
    if (!accessToken) {
        return false;
    }

    const followingUrl = new URL(followingEndpoint);
    followingUrl.search = new URLSearchParams({
        type: "artist",
        ids: artistId
    }).toString();

    const result = await fetch(followingUrl!, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    return result.ok ;
}