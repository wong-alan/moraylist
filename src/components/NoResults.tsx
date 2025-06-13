import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

interface NoResultsProps {
    input: string
}

const NoResults = ({input}: NoResultsProps) => {
    return (
        <Box
            sx={{
                padding: "0px 8px"
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontFamily: "inherit",
                    fontWeight: 700,
                    textAlign: "center",
                    wordWrap: "break-word",
                    width: "100%",
                    maxWidth: "600px",
                    margin: "10vh auto 0px auto"
                }}
            >
                No results found for "{input.trim()}"
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    fontFamily: "inherit",
                    textAlign: "center",
                    width: "fit-content",
                    maxWidth: "450px",
                    margin: "1vh auto 0px auto"
                }}
            >
                Try checking your words for typos or spelling errors.
            </Typography>
        </Box>
    );
};

export default NoResults;