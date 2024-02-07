import { useEffect, useState } from "react";
import { fetchProfile } from "../spotify/profile";
import { CircularProgress } from "@mui/material";

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