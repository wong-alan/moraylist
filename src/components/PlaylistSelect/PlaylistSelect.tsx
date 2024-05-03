import { Dispatch, PropsWithChildren, SetStateAction, forwardRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import "./PlaylistSelect.css"

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
    playlists: Playlist[],
    loading: boolean,
    setValue: Dispatch<SetStateAction<any>>
}

const PlaylistSelect = ({playlists, setValue, loading}: PlaylistSelectProps) => {
    const [inputValue, setInputValue] = useState("");

    return (
        <Autocomplete<Playlist>
            className="playlist-select"
            loadingText="Loading playlists..."
            loading={loading}
            options={playlists}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            filterOptions={filterOptions}
            blurOnSelect
            onChange={(_event, newValue: Playlist | null) => {
                setValue(newValue);
              }}
            inputValue={inputValue}
            onInputChange={(_event, newInputValue: string) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField
                    className="playlist-select-box"
                    {...params}
                    placeholder="Select a playlist"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: "off"
                    }}
                />
            )}
            renderOption={(props, option) => (
                <StyledOptionBox
                    // className doesn't work here
                    sx={{
                        fontWeight: 500,
                        '& > img': {
                            mr: 2,
                            flexShrink: 0,
                            borderRadius: "1px"
                        }
                    }}
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