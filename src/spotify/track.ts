import { getAccessToken } from "./auth";

const audioFeatureEndpoint = "https://api.spotify.com/v1/audio-features";

export const fetchAudioFeatures = async (
    clientId: string,
    code: string,
    songIds: string[]
): Promise<AudioFeatures[] | null> => {
    const accessToken = await getAccessToken(clientId, code);
    if (!accessToken) {
        return null;
    }

    const trackAudioFeatureUrl: URL | string | null = new URL(audioFeatureEndpoint);

    let features: AudioFeatures[] = [];
    for(let i = 0, songIdParams = songIds.slice(i*100, (i+1)*100);
        songIdParams.length;
        songIdParams = songIds.slice(++i*100, (i+1)*100)
    ) {
        trackAudioFeatureUrl.search = new URLSearchParams({
            ids: songIdParams.join(",")
        }).toString();
        const result = await fetch(trackAudioFeatureUrl, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const response: AudioFeaturesResponse = await result.json();
        features.push(...response.audio_features);
    }
    return features;
}