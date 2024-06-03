import { ReactElement, forwardRef, cloneElement } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import "./LandingCard.css";

export interface LandingCardProps {
    icon: React.ReactNode,
    content: string,
    link?: string
}

const LandingCard = forwardRef((
    props: LandingCardProps,
    ref: React.Ref<HTMLDivElement>
) => {
    const {icon, content, link} = props;
    return (
        <Card
            ref={ref}  // Needed for tooltips
            {...props} // Tooltip wants the props to be spread on the same element
            className="landing-card"
            variant="outlined"
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "50%",
                minWidth: "200px",
                maxWidth: "244px",
                minHeight: "65px",
                maxHeight: "80px",
                boxShadow: "none",
                color: "white"
        }}>
            {link &&
                <a href={link}>
                    <span className="landing-card-link"></span>
                </a>
            }
            <CardMedia
                className="landing-card-media"
                sx={{
                    paddingLeft: "16px"
            }}>
                {cloneElement(icon as ReactElement, {className: "landing-card-icon"})}
            </CardMedia>
            <CardContent
                className="landing-card-content"
                sx={{
                    padding: "16px",
                    letterSpacing: "0.02em",
                    userSelect: "none",
                    fontWeight: { xs: 600, sm: 500 }
            }}>
                {content}
            </CardContent>
        </Card>
    );
});

export default LandingCard;