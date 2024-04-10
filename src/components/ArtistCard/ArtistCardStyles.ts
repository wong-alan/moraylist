import Card from "@mui/material/Card";
import { CSSObject, styled } from "@mui/material/styles";
import { InfoSlotStyles } from "../../mui-treasury/info-basic";

export const useStyles = (): CSSObject & Partial<InfoSlotStyles> => {
    return {
        eyebrow: {
            color: "rgba(255, 255, 255, 0.92)",
            lineHeight: 1.4,
            fontSize: "1.0625rem",
            letterSpacing: "1px",
            textTransform: "initial",
            marginBottom: 0,
        },
        title: {
            color: "#fff",
            fontSize: "1.25rem",
            fontWeight: 600,
            lineHeight: 1.2,
        },
        subtitle: {
            color: "rgba(255, 255, 255, 0.72)",
            lineHeight: 1.5,
            "&:last-child": {
                marginTop: "1rem",
            },
        },
    };
};

export const StyledCard = styled(Card)(({theme}) => ({
    borderRadius: "1rem",
    position: "relative",
    maxWidth: 300,
    aspectRatio: "1 / 1.2",
    margin: "0.5vw",
    overflow: "hidden",
    [theme.breakpoints.up("xl")]: {
        margin: "8px"
    }
}));

export const Content = styled("div")({
    padding: "12px 15px",
    boxSizing: "border-box",
    position: "absolute",
    zIndex: 2,
    bottom: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    color: "white"
});