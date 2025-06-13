import { useEffect } from "react";

import { useAppContext } from "../contexts/AppContext";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import { fetchProfile } from "../spotify/user";

const Profile = () => {
    const { clientId, code, profile, setProfile } = useAppContext();

    useEffect(() => {
        if (profile) {
            return;
        }
        fetchProfile(clientId, code!).then(data => setProfile(data));
    }, [code]);

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
};

export default Profile;