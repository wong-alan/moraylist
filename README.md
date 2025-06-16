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

Web manifest icons sized by [Maskable](https://maskable.app).

Some base component styling from [MUI](https://github.com/mui/material-ui) and [MUI Treasury](https://github.com/siriwatknp/mui-treasury).

Animated with [GSAP](https://gsap.com/docs) + [Flip](https://gsap.com/docs/Plugins/Flip/).