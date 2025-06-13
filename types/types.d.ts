// TODO: Convert to DefinitelyTyped

interface AccessTokenResponse {
    access_token: string;
    token_type: "Bearer";
    scope: string;
    expires_in: number;
    refresh_token: string;
}

interface User {
    display_name?: string;
    external_urls: {
        spotify: string;
    };
    followers: {
        href: string;
        total: number;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
}

interface UserProfile extends User {
    country: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean;
        filter_locked: boolean;
    };
    images: Image[];
    product: string;
}

interface Image {
    url: string;
    height: number;
    width: number;
}

interface Artists {
    artists: {
        href: string;
        limit: number;
        next: string | null;
        cursors: {
            after: string | null
            before?: string
        };
        total: number;
        items: Artist[]
    }
}

interface Artist {
    external_urls: {
        spotify: string
    };
    followers: {
        href: string;
        total: number
    };
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string
}

interface Playlists {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: Playlist[]
}

interface UpdatePlaylistResponse {
    snapshot_id: string
}

interface Playlist {
    collaborative: boolean;
    description?: string;
    external_urls: {
        spotify: string
    };
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: User;
    public?: boolean;
    snapshot_id: string;
    tracks: {
        href: string;
        total: number
    };
    type: string;
    uri: string
}

interface RecentPlayHistory {
    href: string;
    limit: number;
    next?: string;
    cursors: {
        after: string;
        before: string;
    };
    total: number;
    items: PlayHistory[];
}

interface PlayHistory {
    track: Track;
    played_at: string;
    context: {
        type: string;
        href: string;
        external_urls: {
            spotify: string;
        }
    };
}

interface Track {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
        isrc: string;
        ean: string;
        upc: string;
    };
    external_urls: {
        spotify: string
    };
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: {};
    restrictions: {
        reason: string;
    };
    name: string;
    popularity: number;
    preview_url?: string;
    track_number: number;
    type: "track";
    uri: string;
    is_local: boolean;
}

interface Album {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    restrictions: {
        reason: string;
    };
    type: string;
    uri: string;
    artists: SimpleArtist[];
}

interface SimpleArtist {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

interface Tracks {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous?: string
    total: number;
    items: PlaylistTrack[]
}

interface PlaylistTrack {
    added_at: string;
    added_by?: {
        external_urls: {
            spotify: string;
        };
        followers: {
            href?: string;  // Currently always null
            total: integer;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
    };
    is_local: boolean;
    track: Track | Episode;
}

interface Episode {
    audio_preview_url?: string;
    description: string;
    html_description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: Image[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    languages: string[];
    name: string;
    release_date: string;
    release_date_precision: string;
    resume_point: {
        fully_played: boolean;
        resume_position_ms: number;
    };
    type: "episode";
    uri: string;
    restrictions: {
        reason: string;
    };
    show: Show;
}

interface Show {
    available_markets: string[];
    copyrights: Copyright[];
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: Image[];
    is_externally_hosted: boolean;
    lanugages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: string;
    uri: string;
    total_episodes: number;
}

interface Copyright {
    text: string;
    type: string;
}

interface AudioFeaturesResponse {
    audio_features: AudioFeatures[];
}

interface AudioFeatures {
    acousticness: number;
    analysis_url: string;
    danceability: number;
    duration_ms: number;
    energy: number;
    id: string;
    instrumentalness: number;
    key: number;
    liveness: number;
    loudness: number;
    mode: number;
    speechiness: number;
    tempo: number;
    time_signature: number;
    track_href: string;
    type: string;
    uri: string;
    valence: number;
}