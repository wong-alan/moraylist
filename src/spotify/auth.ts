import {
    AuthorizationCodeWithPKCEStrategy,
    Scopes,
    SdkOptions,
    SpotifyApi
} from "@spotify/web-api-ts-sdk"

const authEndpoint = "https://accounts.spotify.com/authorize"
const accessTokenEndpoint = "https://accounts.spotify.com/api/token";
const callbackEndpoint = import.meta.env.VITE_ENVIRONMENT === "online" ?
    "https://moraylist.com/callback" :
    "http://localhost:5173/callback";

const scopes = [
    Scopes.userDetails,
    Scopes.userFollow,
    Scopes.userRecents,
    Scopes.playlist.filter(s => s !== "ugc-image-upload"),
];

// === NEW SDK ===
const clientId: string = import.meta.env.VITE_CLIENT_ID;
const redirectUrl = import.meta.env.VITE_ENVIRONMENT === "online" ?
    "https://moraylist.com/callback" :
    "http://localhost:5173/callback";
const newScopes = [
    ...Scopes.userDetails,
    ...Scopes.userFollow,
    ...Scopes.userRecents,
    ...Scopes.playlist.filter(s => s !== "ugc-image-upload"),
];

export const getSpotifyApi = (config?: SdkOptions): SpotifyApi => {
    const auth = new AuthorizationCodeWithPKCEStrategy(clientId, redirectUrl, newScopes);
    const internalSdk = new SpotifyApi(auth, config);
    return internalSdk;
}

export const authenticateSpotify = async (spotify: SpotifyApi) => {
    try {
        console.log("Authenticating!")
        const { authenticated } = await spotify.authenticate();

        if (authenticated) {
            console.log("Authenticated!")
        }
    } catch (e: Error | unknown) {

        const error = e as Error;
        if (error && error.message && error.message.includes("No verifier found in cache")) {
            console.error("If you are seeing this error in a React Development Environment it's because React calls useEffect twice. Using the Spotify SDK performs a token exchange that is only valid once, so React re-rendering this component will result in a second, failed authentication. This will not impact your production applications (or anything running outside of Strict Mode - which is designed for debugging components).", error);
        } else {
            console.error(e);
        }
    }
}
// ================

// LOCAL STORAGE
export const ACCESS_TOKEN = "access-token";
export const REFRESH_TOKEN = "refresh-token";
export const TOKEN_EXPIRY = "token-expiry";
export const VERIFIER = "verifier"

const MS_PER_MINUTE = 60_000;
const MS_PER_SECOND = 1_000;

export const generateCodeVerifier = (length: number): string => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export const generateCodeChallenge = async (codeVerifier: string): Promise<string> => {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export const generateAuthUrl = (clientId: string, challenge: string): string => {
    const params = new URLSearchParams({
        client_id: clientId,
        response_type: "code",
        redirect_uri: callbackEndpoint,
        scope: scopes.join(" "),
        code_challenge_method: "S256",
        code_challenge: challenge
    });
    const authUrl = new URL(authEndpoint);
    authUrl.search = params.toString();
    return authUrl.toString();
}

const getLocalToken = (): string | null => {
    const localToken = localStorage.getItem(ACCESS_TOKEN);
    const expiry = localStorage.getItem(TOKEN_EXPIRY);

    if (expiry && localToken) {
        const expiryDate = new Date(expiry);
        const currentDate = new Date(new Date().getTime() - 1 * MS_PER_MINUTE);
        if (expiryDate > currentDate) {
            return localToken;
        }
    }
    return null;
}

const refreshAccessToken = async (clientId: string): Promise<string | null> => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    if (!refreshToken) {
        return null;
    }

    const payload: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId
        }),
    }
    const result = await fetch(accessTokenEndpoint, payload);
    const { access_token, expires_in, refresh_token } = await result.json();
    if (!result.ok) {
        return null;
    }

    const expiryDate = new Date(new Date().getTime() + expires_in * MS_PER_SECOND).toString();
    localStorage.setItem(TOKEN_EXPIRY, expiryDate);
    localStorage.setItem(ACCESS_TOKEN, access_token);
    localStorage.setItem(REFRESH_TOKEN, refresh_token);
    return access_token;
}

const getNewAccessToken = async (clientId: string, code: string): Promise<string | null> => {
    const verifier = localStorage.getItem(VERIFIER);

    const payload: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: "authorization_code",
            code: code,
            redirect_uri: callbackEndpoint,
            code_verifier: verifier!
        })
    };

    const result = await fetch(accessTokenEndpoint, payload);
    if (!result.ok) {
        return null;
    }
    const { access_token, expires_in, refresh_token } = await result.json();

    const expiryDate = new Date(new Date().getTime() + expires_in * MS_PER_SECOND).toString();
    localStorage.setItem(TOKEN_EXPIRY, expiryDate);
    localStorage.setItem(ACCESS_TOKEN, access_token);
    localStorage.setItem(REFRESH_TOKEN, refresh_token);
    return access_token;
}

export const getAccessToken = async (clientId: string, code: string): Promise<string|null> => {
    // Check if there is a valid access token in local storage
    const localToken = getLocalToken();
    if (localToken) {
        return localToken;
    }

    // Check if we have a refresh token to get a new access token
    const refreshedToken = await refreshAccessToken(clientId);
    if (refreshedToken) {
        return refreshedToken;
    }

    // Get a new access token
    const newToken = await getNewAccessToken(clientId, code);
    if (newToken) {
        return newToken;
    }

    return null;
}
