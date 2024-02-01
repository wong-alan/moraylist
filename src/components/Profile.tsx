import { useEffect, useState } from "react";
import { getAccessToken } from "../auth";
import { CircularProgress } from "@mui/material";

const fetchProfile = async (clientId: string, code: string): Promise<UserProfile> => {
    const accessToken: string = await getAccessToken(clientId, code);
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });
    const profile: UserProfile = await result.json();
    return profile;
}

const Profile = ({clientId, code}: {clientId: string, code: string}) => {

    const [profile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        fetchProfile(clientId, code).then(data => setUserProfile(data));
    }, []);

    return (
        <section id="profile">
            {profile ?
                (<div>
                    <h2>Logged in as <span id="displayName">{profile.display_name}</span></h2>
                    <span id="avatar">
                        {profile.images[0]?.url && <img src={profile.images[0]?.url} width='200' height='200' />}
                    </span>
                    <ul>
                        <li>User ID: <span id="id">{profile.id}</span></li>
                        <li>Email: <span id="email">{profile.email}</span></li>
                        <li>Spotify URI: <a id="uri" href={profile.external_urls.spotify}>{profile.uri}</a></li>
                        <li>Link: <a id="url" href={profile.href}>{profile.href}</a></li>
                        <li>Profile Image: <span id="imgUrl">{profile.images[0]?.url ?? '(no profile image)'}</span></li>
                    </ul>
                </div>)
                : <CircularProgress />
            }
        </section>
    );
}

export default Profile;