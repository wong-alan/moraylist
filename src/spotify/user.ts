import { getAccessToken } from "./auth";

export const fetchProfile = async (clientId: string, code: string): Promise<UserProfile | null> => {
    const accessToken = await getAccessToken(clientId, code);
    if (!accessToken) {
        return null;
    }

    const result = await fetch("https://api.spotify.com/v1/me", {
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

    let followingEndpoint: URL | string | null = new URL("https://api.spotify.com/v1/me/following");
    followingEndpoint.search = new URLSearchParams({
        type: "artist",
        ...(after && {after: after}),
        limit: "50"
    }).toString();
    let followingArtists: Artist[] = [];

    do {
        const result = await fetch(followingEndpoint!, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const response: Artists = await result.json();
        followingArtists.push(...response.artists.items);
        followingEndpoint = response.artists.next;
    } while (followingEndpoint);

    console.log(followingArtists);

    return followingArtists;
}