import { getAccessToken } from "./auth";

export const fetchProfile = async (clientId: string, code: string): Promise<UserProfile> => {
    const accessToken: string = await getAccessToken(clientId, code);
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    const profile: UserProfile = await result.json();
    return profile;
}