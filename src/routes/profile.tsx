import { useContext, useEffect } from "react";

import CircularProgress from "@mui/material/CircularProgress";

import AppContext from "../contexts/AppContext";
import { ProfileCard } from "../components/ProfileCard";
import { fetchProfile } from "../spotify/user";

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
                : <CircularProgress sx={{ margin: 20 }}/>
            }
        </section>
    );
}

export default Profile;