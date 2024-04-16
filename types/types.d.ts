interface User {
    display_name?: string
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
        filter_locked: boolean
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
    }
    type: string;
    uri: string
}

interface PlayHistory {
    href: string;
    limit: number;
    next?: string;
    cursors: {
        after: string;
        before: string;
    };
    total: number;
    items: PlayHistoryObject[];
}

interface PlayHistoryObject {
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
    type: string;
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