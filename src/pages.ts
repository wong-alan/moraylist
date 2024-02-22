interface page {
    name: string,
    url: string
}

const pages: page[] = [
    { name: "My Followed Artists", url: "/following"},
    { name: "Shuffle Playlists", url: "/shuffle"}
];

export default pages;