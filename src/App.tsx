import './App.css';
// import { sleep } from './utils.tsx';
import Profile from './components/Profile';
import Login from './components/Login';
import { getAccessToken } from './auth.ts';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

const clientId = import.meta.env.VITE_CLIENT_ID;

function App() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");

    if (!code) {
        return (
            <>
                <Login />
                {error && <div className='error'>Authentication with Spotify failed</div>}
            </>
        );
    }

    const [accessToken, setAccessToken] = useState<string | null>(null);
    useEffect(() => {
        // sleep(1000)
            // .then(() =>
            getAccessToken(clientId, code)//)
            .then(data => setAccessToken(data));
    }, []);

    return (
        <>
            <div>
                {accessToken
                    ? <Profile accessToken={accessToken}/>
                    : <CircularProgress id='App'/>}
            </div>
        </>
    );
}

export default App
