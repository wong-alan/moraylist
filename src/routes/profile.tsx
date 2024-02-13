import { useContext, useEffect } from "react";
import AppContext from "../AppContext";
import CircularProgress from "@mui/material/CircularProgress";
import { ProfileCard } from "../mui-treasury/ProfileCard";
import { fetchProfile } from "../spotify/profile";

const Profile = () => {
    const { clientId, code, profile, setProfile } = useContext(AppContext);

    useEffect(() => {
        if (profile) {
            return;
        }
        fetchProfile(clientId, code!).then(data => setProfile(data));
    }, []);

    return (
        <section id="profile"
            style={{
                display: "flex",
                justifyContent: "space-evenly"
            }}>
            {profile ?
                (<>
                    <ProfileCard profile={profile} />
                </>)
                : <CircularProgress />
            }
        </section>
    );
}

export default Profile;