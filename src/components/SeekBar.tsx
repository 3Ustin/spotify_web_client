//import place
import { useEffect, useState} from 'react';
import { DoubleArrowTwoTone } from '@mui/icons-material';
import Slider from '@mui/material/Slider';
import useInterval from '../hooks/useInterval';

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

    //Proccess B.1

    //Proccess B.3

    //First time Component is Rendered run this function
    useInterval(processC,1000);
    function processC(){
        if(isSongPlaying){setSeekValue(seekValue + 1000);}
    }
    useEffect(() => {
        setSeekValue(position)
    }, [duration, position]);
    function onChange(event:React.ChangeEvent<HTMLInputElement>){
        console.log(event);
        const pos = parseInt(event.target.value);
        seek(pos);
        setSeekValue(pos);
    }
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