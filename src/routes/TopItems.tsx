import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAppContext } from "../contexts/AppContext";
import ChipGroup from "../components/ChipGroup";
import ErrorSnack from "../components/ErrorSnack";
import { useTopItemsPageContext } from "../contexts/TopItemsPageContext";
import { fetchTopItems, TopItemTimeRange, topItemTimeRanges, TopItemType, topItemTypes } from "../spotify/user";
import { topItemsTimeMap, topItemsTypeMap } from "../components/TopItems/TopItemsMap";



const TopItems = () => {
    const { clientId, code } = useAppContext();
    const { openError, setOpenError, errorMessage, setErrorMessage } = useTopItemsPageContext();
    const [ itemType, setItemType ] = useState<TopItemType>(topItemTypes[0]);
    const [ timeRange, setTimeRange ] = useState<TopItemTimeRange>(topItemTimeRanges[0]);
    const [ topItems, setTopItems ] = useState<Track[] | Artist[] | undefined[]>([...Array<undefined>(15)]);

    useEffect(() => {
        fetchTopItems(clientId, code!, itemType, timeRange).then(data => {
            if (data) {
                setTopItems(data);
            } else {
                setErrorMessage("Error loading top items. Try again.");
                setOpenError(true);
            }
        });
    }, [itemType, timeRange]);

    return (
        <section id="recent">
            <Container maxWidth="xl">
                <Grid container>
                    <Grid size={{ xs: 0.25 }} />
                    <Grid size={{ xs: 11.5 }}>
                        <Typography
                            variant="h4"
                            className="title"
                        >
                            Your Tops
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 0.25 }} />
                    <Grid size={{ xs: 0.25 }} />
                    <Grid size={{ xs: 11.5 }}>
                        <Typography
                            variant="body1"
                            className="subtitle"
                        >
                            Write them down in a little black books or just reminisce about these torrid encounters.<br />
                            These were your tops that you just couldn&apos;t stop going back to.<br />
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 0.25 }} />
                    <Grid size={{ xs: 0.25 }} />
                    <Grid size={{ xs: 11.5 }}>
                        <ChipGroup
                            labels={topItemsTypeMap}
                            selected={itemType}
                            setSelected={setItemType}
                        />
                    </Grid>
                    <Grid size={{ xs: 0.25 }} />
                    <Grid size={{ xs: 0.25 }} />
                    <Grid size={{ xs: 11.5 }}>
                        <ChipGroup
                            labels={topItemsTimeMap}
                            selected={timeRange}
                            setSelected={setTimeRange}
                        />
                    </Grid>
                    <Grid size={{ xs: 0.25 }} />
                    {
                        topItems.map((item, index) =>
                            <>
                            <Grid size={{ xs: 0.25 }} />
                            <Grid container
                                size={{ xs: 11.5 }}
                                key={`track-${index}`}
                            >
                                {`${item?.name}`}
                            </Grid>
                            <Grid size={{ xs: 0.25 }} />
                            </>)
                    }
                </Grid>
            </Container>
            <ErrorSnack
                message={errorMessage}
                open={openError}
                setOpen={setOpenError}
            />
        </section>
    );
};

export default TopItems;