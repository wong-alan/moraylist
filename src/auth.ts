const authEndpoint = "https://accounts.spotify.com/authorize"
const accessTokenEndpoint = "https://accounts.spotify.com/api/token";
const callbackEndpoint = "http://localhost:5173/callback";
const scopes = [
    "user-read-private",
    "user-read-email"
];

export const generateCodeVerifier = (length: number): string => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export const generateCodeChallenge = async(codeVerifier: string): Promise<string> => {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export const generateAuthUrl = (clientId: string, challenge: string): string => {
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", callbackEndpoint);
    params.append("scope", scopes.join(" "));
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    const authUrl = new URL(authEndpoint);
    authUrl.search = params.toString();
    return authUrl.toString();
}

export const getAccessToken = async (clientId: string, code: string): Promise<string> => {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", callbackEndpoint);
    params.append("code_verifier", verifier!);

    const result = await fetch(accessTokenEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}
