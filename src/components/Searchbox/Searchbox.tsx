import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import ClearRounded from "@mui/icons-material/ClearRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import "./Searchbox.css";

const DEBOUNCE_MS = 250;

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
    const [inputValue, setInputValue] = useState(text);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    useEffect(() => {
        setInputValue(text);
    }, [text]);

    useEffect(() => {
        return () => clearTimeout(debounceRef.current);
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => setText(value), DEBOUNCE_MS);
    };

    const clearTextbox = () => {
        clearTimeout(debounceRef.current);
        setInputValue("");
        setText("");
    };

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
    };

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
            endAdornment={inputValue && clearButton()}
            slotProps={{
                input: {
                    className: "metro-font",
                    maxLength: 200
                }
            }}
            value={inputValue}
            onChange={handleChange}
        />
    );
};

export default Searchbox;