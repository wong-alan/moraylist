# Moraylist

A web app with [Spotify Web API](https://developer.spotify.com/documentation/web-api) integration to manage your music.
A learning project.

Try it out at [www.moraylist.com](https://www.moraylist.com)* \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*public access pending Spotify extension request.

For a beta preview, message: info@moraylist.com \
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

### Planned future improvements
- Functional
  - View your top genres/decades
- Technical
  - Rewrite using [Spotify Web API SDK](https://www.npmjs.com/package/@spotify/web-api-ts-sdk) [[Blog post](https://developer.spotify.com/blog/2023-07-03-typescript-sdk)]
  - Use [React Query](https://tanstack.com/query/latest) to handle state management of fetched data

___
### React + TypeScript + Vite

Start up a local instance with `npm run dev` \
You will need a `.env` file with:
* Spotify API Client ID
* Deployment environment

Build the project with `npm run build`

Web manifest icons sized by [Maskable](https://maskable.app).

Some base component styling from [MUI](https://github.com/mui/material-ui) and [MUI Treasury](https://github.com/siriwatknp/mui-treasury).

Animated with [GSAP](https://gsap.com/docs) + [Flip](https://gsap.com/docs/Plugins/Flip/).