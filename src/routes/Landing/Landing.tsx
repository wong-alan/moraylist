import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import QueueMusicRoundedIcon from '@mui/icons-material/QueueMusicRounded';
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import NightlifeRoundedIcon from '@mui/icons-material/NightlifeRounded';
import LandingCard, { LandingCardProps } from "../../components/LandingCard/LandingCard";
import Login from "../../components/nav/Login";
import SpotifyLogo from "../../components/icons/SpotifyLogo";
import { useAppContext } from "../../contexts/AppContext";
import { DEFAULT_TOOLTIP_SX } from "../../utils";
import "./Landing.css";

const cards: (LandingCardProps & {key:string, tooltip?:string})[] = [
    {
        key: "shuffle",
        icon: <QueueMusicRoundedIcon />,
        content: "Shuffle your playlists",
        link: "/shuffle"
    },{
        key: "following",
        icon: <RecordVoiceOverRoundedIcon />,
        content: "Manage your followed artists",
        link: "/following"
    },{
        key: "recent",
        icon: <HistoryRoundedIcon />,
        content: "View recently played",
        link: "/recent"
    },{
        key: "dance",
        icon: <NightlifeRoundedIcon />,
        content: "Check playlist danceability",
        link: "/analyze"
    },{
        key: "tempo",
        icon: <DirectionsRunRoundedIcon />,
        content: "Analyze your playlist tempo",
        link: "/analyze"
    },{
        key: "genres",
        icon: <StarRoundedIcon />,
        content: "See your top genres",
        tooltip: "Coming soon"
    }
];

const Landing = () => {
    const { code } = useAppContext();

    return (<>
        <div className="landing-gradient" />
        <section id="landing">
            <Container maxWidth="xl">
                <Grid container>
                    <Grid container
                        size={{ xs: 12 }}
                        justifyContent={"center"}
                    >
                        <Typography
                            variant="h3"
                            sx={(theme) => ({
                                fontFamily: "inherit",
                                fontWeight: 700,
                                marginTop: "15vh",
                                letterSpacing: "0.05em",
                                [theme.breakpoints.down("sm")]: {
                                    marginTop: "12vh"
                                }
                            })}
                        >
                            Your music, managed.
                        </Typography>
                    </Grid>
                    <Grid container
                        size={{ xs: 12 }}
                        justifyContent={"center"}
                    >
                        <Typography
                            variant="h6"
                            sx={(theme) => ({
                                fontFamily: "inherit",
                                marginTop: "3vh",
                                marginBottom: "5vh",
                                [theme.breakpoints.down("sm")]: {
                                    marginBottom: "2vh"
                                }
                            })}
                        >
                            Organize your playlists, artists, and tracks, in one spot.
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 2 }} />
                    <Grid container
                        size={{ xs: 8 }}
                        spacing={2}
                    >
                        {cards.map(card =>
                            <Grid key={card.key}
                                container
                                size={{ xs: 6 }}
                                className="landing-card-container"
                            >
                                { card.tooltip ?
                                    <Tooltip
                                        title={card.tooltip}
                                        componentsProps={{
                                            tooltip: {
                                                sx: DEFAULT_TOOLTIP_SX
                                            }
                                        }}
                                    >
                                        <LandingCard
                                            icon={card.icon}
                                            content={card.content}
                                            link={card.link}
                                        />
                                    </Tooltip>
                                    : <LandingCard
                                        icon={card.icon}
                                        content={card.content}
                                        link={card.link}
                                    />
                                }
                            </Grid>
                        )}
                    </Grid>
                    <Grid size={{ xs: 2 }} />
                    {!code &&
                        <Grid container
                            size={{ xs: 12 }}
                            justifyContent={"center"}
                            sx={{marginTop: "5vh"}}
                        >
                            <Login size="sm" />
                        </Grid>
                    }
                    <Grid size={{ xs: 1 }} />
                    <Grid container
                        size={{ xs: 10 }}
                        justifyContent={"right"}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: "inherit",
                                marginTop: "7vh",
                                marginBottom: "5vh"
                            }}
                        >
                            A toolbox for <SpotifyLogo width={110} sx={{transform: "translate(0px, 10px)"}} />.
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 1 }} />
                </Grid>
            </Container>
        </section>
    </>);
};

export default Landing;
