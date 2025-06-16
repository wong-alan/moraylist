import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ExplicitRounded from "@mui/icons-material/ExplicitRounded";
import "./TopItemCard.css";

interface TopItemCardProps {
    place: number
    title: string
    subtitle?: string
    img?: string
    link?: string
    explicit?: boolean
}

const TopItemCard = ({place, title, subtitle, img, link, explicit}: TopItemCardProps) => {
    return (
        <Card className="top-item-card">
            <Typography className="top-item-card-place">
                {place}
            </ Typography>
            { img &&
                <CardMedia
                    className="top-item-card-media"
                    component="img"
                    loading="lazy"
                    src={img}
                    alt={`Image: ${title}`}
                />
            }
            <CardContent className="top-item-card-content">
                <Typography className={`top-item-card-title ${!subtitle && "title-only"}`}>
                    { link &&
                        <Link to={link} className="link-style hover-underline">
                            { title }
                        </Link>
                    }
                </Typography>
                { explicit &&
                    <ExplicitRounded
                        sx={{
                            position: "absolute",
                            top: "0px",
                            right: "0px",
                        }}
                    />
                }
                { subtitle &&
                    <Typography className="top-item-card-subtitle">
                        { subtitle }
                    </Typography>
                }
            </CardContent>
        </Card>
    );
};

export default TopItemCard;