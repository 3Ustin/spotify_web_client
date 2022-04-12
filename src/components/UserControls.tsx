import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import FastRewind from '@mui/icons-material/FastRewind';
import Replay10Icon from '@mui/icons-material/Replay10';
import Forward10Icon from '@mui/icons-material/Forward10';
import PauseIcon from '@mui/icons-material/Pause';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import '../css/controlDisplay.css';

//Acceptable format for props data
export interface IUserControlFunctions {
    backward: (event: React.MouseEvent<HTMLElement>) => void,
    toggle: (event: React.MouseEvent<HTMLElement>) => void,
    forward: (event: React.MouseEvent<HTMLElement>) => void,
    volume: (event: React.ChangeEvent<HTMLInputElement>) => void,
    tenForward: (event: React.MouseEvent<HTMLElement>) => void,
    tenBackward: (event: React.MouseEvent<HTMLElement>) => void,
}

export interface IUserControlsProps {
    controlFunctions: IUserControlFunctions,
    isPlaying: boolean
}
function UserControls(props:IUserControlsProps){
//PUT IN BOOL LOGIC HERE 
    let toggleIcon;
    if(props.isPlaying){toggleIcon = <PauseIcon/>}
    else{toggleIcon = <PlayArrowIcon/>}


    //Displaying Props
return(
    <div>
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar >
                <Button onClick={props.controlFunctions.backward} variant="contained" startIcon={<SkipPreviousIcon/>}></Button>
                <Button onClick={props.controlFunctions.toggle} variant="contained" startIcon={toggleIcon}></Button>
                <Button onClick={props.controlFunctions.forward} variant="contained" startIcon={<SkipNextIcon/>}></Button>
                {/*@ts-ignore*/}
                <Slider min={1} max={100} step={1} onChange={props.controlFunctions.volume}></Slider>
                <Button onClick={props.controlFunctions.tenBackward} variant="contained" startIcon={<Replay10Icon/>}></Button>
                <Button onClick={props.controlFunctions.tenForward} variant="contained" startIcon={<Forward10Icon/>}></Button>
            </Toolbar>
        </AppBar>
    </div>
);
}
export default UserControls;