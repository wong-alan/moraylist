import { PropsWithChildren, forwardRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import "./PlaylistSelect.css"
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const ListItemBox = forwardRef<HTMLLIElement, PropsWithChildren>(function ListItemBox(props, ref) {
    return <Box ref={ref} component={"li"} {...props} />;
});

const StyledOptionBox = styled(ListItemBox)({
    backgroundColor: "#EDEDED",
    color: "#484848",
    borderRadius: "8px",
    margin: "0px 3px",
    "&.MuiAutocomplete-option:hover": {
        backgroundColor: "#D8D8D8"
    }

});

const filterOptions = createFilterOptions<Playlist>({
    ignoreAccents: true,
    ignoreCase: true,
    stringify: (option) => option.name
});

interface PlaylistSelectProps {
    playlists: Playlist[]
}

const PlaylistSelect = ({playlists}: PlaylistSelectProps) => {
    return (
        <Autocomplete<Playlist>
            className="playlist-select"
            options={playlists}
            autoHighlight
            getOptionLabel={(option) => option.name}
            filterOptions={filterOptions}
            renderInput={(params) => (
                <TextField
                    className="playlist-select-box"
                    {...params}
                    placeholder="Select a playlist"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
            renderOption={(props, option) => (
                <StyledOptionBox
                    // className doesn't work here
                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    {...props}
                >
                    <img
                        loading="lazy"
                        width="40"
                        src={option.images.at(-1)?.url}
                        alt={`Playlist cover image: ${option.name}`}
                    />
                    {option.name}
                </StyledOptionBox>
            )}
            PaperComponent={(props) => (
                <Paper
                    // className doesn't work here
                    {...props}
                    sx={{
                        backgroundColor: "#EFEFEF"
                    }}
                />
            )}
        />
    );
}

export default PlaylistSelect;