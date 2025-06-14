import { Dispatch, SetStateAction } from "react";
import Chip from "@mui/material/Chip";
import { noFullHover } from "../utils";

interface ChipGroupProps<T = string> {
    labels: Record<string, { label: string }> ,
    selected: T,
    setSelected: Dispatch<SetStateAction<T>>,
    setLoading?: () => void,
}

const ChipGroup = <T extends string>({labels, selected, setSelected, setLoading}: ChipGroupProps<T>) => {
    const handleClick = (label: T) => () => {
        if (selected === label) { return; }
        setSelected(label);
        if (setLoading) { setLoading(); }
    };

    return (<>
        { Object.entries(labels).map(([key, label]) =>
            <Chip
                key={key}
                label={label.label}
                color="spotify"
                onClick={handleClick(key as T)}
                variant={key === selected ? "filled" : "outlined"}
                sx={{
                    margin: "5px",
                    fontFamily: "inherit",
                    fontWeight: 500,
                    ...(noFullHover() && {
                        "&:hover": {
                            backgroundColor: "rgb(29, 173, 80) !important"
                        }
                    })
                }}
            />)
        }
    </>);
};

export default ChipGroup;