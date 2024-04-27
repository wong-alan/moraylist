# Splotchify

A web app with [Spotify Web API](https://developer.spotify.com/documentation/web-api) integration to manage your music.
A learning project.

Try it out at [www.splotchify.com](https://www.splotchify.com)* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*public access pending Spotify extension request

For a beta preview, message: info@splotchify.com \
Please include your name and the email address associated with your Spotify account.

___
### Current supported functions
- Shuffle your playlists
- Manage your followed artists
- View recently played
- Analyze playlist tempo
- Analyze playlist danceability
- Analyze playlist mood
- Analyze playlist energy

### Planned future functions
- View your top genres

___
### React + TypeScript + Vite

Start up a local instance with `npm run dev` \
You will need a `.env` file with:
* Spotify API Client ID
* Deployment environment

Build the project with `npm run build`

Some base component styling from [MUI](https://github.com/mui/material-ui) and [MUI Treasury](https://github.com/siriwatknp/mui-treasury).

Animated with [GSAP](https://gsap.com/docs) + [Flip](https://gsap.com/docs/Plugins/Flip/).