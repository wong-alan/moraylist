import { useEffect } from "react";

import { useAppContext } from "../contexts/AppContext";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import { fetchProfile } from "../spotify/user";

const Profile = () => {
    const { spotify, profile, setProfile } = useAppContext();
    console.log("Landed at profile")
    useEffect(() => {
        if (profile) {
            return;
        }
        fetchProfile(spotify).then(data => setProfile(data));
    }, []);

    return (
        <section id="profile"
            style={{
                display: "flex",
                justifyContent: "space-evenly",
                paddingTop: "7vh"
        }}>
            <ProfileCard profile={profile} />
        </section>
    );
}

export default Profile;