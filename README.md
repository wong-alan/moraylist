# ![Moraylist Eel Logo](/src/assets/moray.svg) Moraylist

A web app with [Spotify Web API](https://developer.spotify.com/documentation/web-api) integration to manage your music.

Try it out at [www.moraylist.com](https://www.moraylist.com)

___
### Current supported functions
- Shuffle your playlists
- Manage your followed artists
- View recently played
- Analyze playlist tempo
- Analyze playlist danceability
- Analyze playlist mood
- Analyze playlist energy
- See your top tracks/artists

___
### React + TypeScript + Vite

Start up a local instance with `npm run dev` \
You will need a `.env` file with:
* Spotify API Client ID<sup>1</sup>
* Deployment environment

> <sup>1</sup> [27/11/2024] - Spotify has deprecated some endpoints on new API keys including retrieving audio features.
> - [Spotify Dev Blog](https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api)

Build the project with `npm run build`

View bundle visualization at `analyse.html`
___
### Exposing dev server on local network

This was developed with Vite on WSL2. Here are instructions to expose the server to your local network. \
[Vite Documentation](https://vite.dev/config/server-options.html#server-host) \
[WSL Documentation](https://learn.microsoft.com/en-us/windows/wsl/networking#accessing-a-wsl-2-distribution-from-your-local-area-network-lan)

1. Add your machine's local IP to `auth.ts` as a callback URL; also add it to your Spotify dev config as a valid callback URL.
2. Add netsh rule on Windows PowerShell \
    `netsh interface portproxy add v4tov4 listenport=<yourPortToForward> listenaddress=0.0.0.0 connectport=<yourPortToConnectToInWSL> connectaddress=(wsl hostname -I)`
    * `<yourPortToConnect>`: The port you want to access on your machine. `5173`
    * `<yourPortToConnectToInWSL>`: The port from WSL you want to expose. Vite default: `5173`
    * `(wsl hostname -I)`: The WSL IP address. Run the command to get your WSL IP.
3. Add Windows firewall rule to forward port.
    * Go to `Windows Firewall with Advanced Security`
    * Under Inbound Rules add a New Rule.
    * Select Port as the Rule Type.
    * Enter the port you want to allow. `5173`
    * Select `Allow the connection` in the Action Step.
    * Select a profile for when you want the rule to apply.
    * Give your rule a name.
4. Run vite with --host option. \
    Here are a few ways to deploy to your local IP address.
    * Run `npx vite --host`
    * Change `package.json` to include:
    ```
    "scripts": {
        "dev": "vite --host",
    }
    ```
    * Change `vite.config.ts` to include
    ```
    server: {
        host: true
    }
    ```
    or
    ```
    server: {
        host: '0.0.0.0'
    }
    ```

To run without the `--host` option again. Remove the `netsh` rule.
`netsh interface portproxy reset ipv4`
___

Web manifest icons sized by [Maskable](https://maskable.app).

Some base component styling from [MUI](https://github.com/mui/material-ui) and [MUI Treasury](https://github.com/siriwatknp/mui-treasury).

Animated with [GSAP](https://gsap.com/docs) + [Flip](https://gsap.com/docs/Plugins/Flip/).

iOS debugging courtesy of [ios-safari-remote-debug-kit](https://github.com/HimbeersaftLP/ios-safari-remote-debug-kit)