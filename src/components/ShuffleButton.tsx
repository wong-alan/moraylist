import { Dispatch, SetStateAction, useState } from 'react';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { useAppContext } from '../contexts/AppContext';
import LinearWithValueLabel from "./LinearWithValueLabel";
import ButtonBase from "./ButtonBase/ButtonBase";
import { reorderPlaylist } from '../spotify/playlist';
import { sleep } from '../utils';

const doShuffle = async (
    clientId: string,
    code: string,
    playlistId: string,
    length: number,
    setShuffling: Dispatch<SetStateAction<boolean>>,
    setProgress: Dispatch<SetStateAction<number>>,
    setLabel: Dispatch<SetStateAction<string>>
) => {
    // Inclusive of min, exclusive of max
    const randInt = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min) + min);
    }
    setShuffling(true);

    let snapshot_id;
    for (let to = 0; to < length - 1; to++) {
        setLabel(to + 1 + "/" + length);
        setProgress(Math.floor(((to+1) / (length-1)) * 100));

        const from = randInt(to, length);
        if (to === from) { continue; }
        snapshot_id = await reorderPlaylist(clientId, code, playlistId, from, to, snapshot_id);

        await sleep(150);
    }
    setLabel(length + "/" + length);
    await sleep(5000);
    setShuffling(false);
}

interface ShuffleButtonProps {
    playlistId: string,
    length: number
}

const ShuffleButton = ({playlistId, length}: ShuffleButtonProps) => {
    const { clientId, code } = useAppContext();
    const [shuffling, setShuffling] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [label, setLabel] = useState<string>("");

    return (<>{
        shuffling ?
            <LinearWithValueLabel label={label} progress={progress} />
            : <ButtonBase
                buttonText='Shuffle'
                buttonIcon = {<ShuffleIcon />}
                buttonSize = "small"
                onClick = {async () => await doShuffle(clientId, code!, playlistId, length, setShuffling, setProgress, setLabel)}
            />
    }</>);
}

export default ShuffleButton;