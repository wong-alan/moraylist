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