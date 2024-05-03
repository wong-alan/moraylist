import { Dispatch, SetStateAction } from "react";
import Chip from "@mui/material/Chip";
import { noFullHover } from "../utils";

interface Label {
    label: string
}

interface ChipGroupProps {
    labels: Record<string, Label> ,
    selected: string,
    setSelected: Dispatch<SetStateAction<string>>,
}

const ChipGroup = ({labels, selected, setSelected}: ChipGroupProps) => {
    const handleClick = (label: string) => () => {
        setSelected(label);
    }

    return (<>
        { Object.entries(labels).map(([key, label]) =>
            <Chip
                key={key}
                label={label.label}
                color="spotify"
                onClick={handleClick(key)}
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
}

export default ChipGroup;