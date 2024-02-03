import './App.css';
import Profile from './components/Profile';
import Login from './components/login/Login';
import { CODE } from './utils';

const clientId = import.meta.env.VITE_CLIENT_ID;

function App() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    // Save new code
    if (code) {
        localStorage.setItem(CODE, code);
    }

    // Auth code available, show profile
    const localCode = localStorage.getItem(CODE);
    if (localCode && localCode != "undefined") {
        return (
            <>
                <Profile clientId={clientId} code={localCode!}/>
            </>
        );
    }

    // No auth code
    const error = params.get("error");
    return (
        <>
            <Login />
            {error && <div className='error'>Authentication with Spotify failed</div>}
        </>
    );
}

export default App
