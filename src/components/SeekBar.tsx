//import place
import { useEffect, useState} from 'react';
import { DoubleArrowTwoTone } from '@mui/icons-material';
import Slider from '@mui/material/Slider';
import useInterval from '../hooks/useInterval';

const SEEK_DEBOUNCE_TIMEOUT_MS = 500

export interface SeekBarProps {
    isSongPlaying:boolean;
    duration:number;
    position:number;
    seek:(position_ms: number) => void;
}
//File Exported Function
function SeekBar(props: SeekBarProps){
    const {isSongPlaying, duration, position, seek} = props;
    const [seekValue,setSeekValue] = useState<number>(position);
    const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<typeof setTimeout> | undefined>()

    //First time Component is Rendered run this function
    useInterval(processC,1000);
    function processC(){
        console.warn(debounceTimeout)
        if (isSongPlaying && debounceTimeout === undefined) {
            setSeekValue(seekValue + 1000);
        }
    }
    useEffect(() => {
        setSeekValue(position);
    }, [duration, position]);
    function onChange(event:React.ChangeEvent<HTMLInputElement>){
        const pos = parseInt(event.target.value);
        debouncedSeek(pos);
        setSeekValue(pos);
    }

    const debouncedSeek = (pos: number) => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        const updatedTimeout = setTimeout(() => {
            seek(pos);
            setDebounceTimeout(undefined);
        }, SEEK_DEBOUNCE_TIMEOUT_MS);

        setDebounceTimeout(updatedTimeout);
    };

    return(
    <Slider
        min={1}
        max={duration}
        step={1000}
        //@ts-ignore
        onChange={onChange}
        value={seekValue}
    ></Slider>
    );
}
//Export function as default setting creating component
export default SeekBar;