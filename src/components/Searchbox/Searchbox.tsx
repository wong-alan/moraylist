import { ChangeEvent, Dispatch, SetStateAction } from "react";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ClearRounded from "@mui/icons-material/ClearRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import "./Searchbox.css";

interface SearchboxProps {
    label: string,
    placeholder: string,
    text: string,
    setText: Dispatch<SetStateAction<string>>
}

const Searchbox = ({
    label,
    placeholder,
    text,
    setText,
}: SearchboxProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }

    const clearTextbox = () => {
        setText("");
    }

    const clearButton = () => {
        return (
            <InputAdornment position="end">
                <IconButton
                    aria-label="Clear search box"
                    disableTouchRipple
                    onClick={clearTextbox}
                >
                    <ClearRounded />
                </IconButton>
            </InputAdornment>
        );
    }

    return (
        <Input
            className="searchbox"
            aria-label={label}
            placeholder={placeholder}
            startAdornment={
                <InputAdornment
                    position="start"
                    disablePointerEvents
                >
                    <SearchRounded />
                </InputAdornment>
            }
            endAdornment={text && clearButton()}
            slotProps={{ input: { className: "metro-font" } }}
            value={text}
            onChange={handleChange}
        />
    );
}

export default Searchbox;