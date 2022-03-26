//Acceptable format for props data
export interface IUserControlsProps {
    backward: (event: React.MouseEvent<HTMLElement>) => void
    toggle: (event: React.MouseEvent<HTMLElement>) => void,
    forward: (event: React.MouseEvent<HTMLElement>) => void,
    volume: (event: React.ChangeEvent<HTMLInputElement>) => void,
    tenForward: (event: React.MouseEvent<HTMLElement>) => void,
    tenBackward: (event: React.MouseEvent<HTMLElement>) => void
}
function UserControls(props:IUserControlsProps){
    //Displaying Props
return(
    <div> 
        <button onClick={props.backward}>backward</button>
        <button onClick={props.toggle}>toggle</button>
        <button onClick={props.forward}>forward</button>
        <input type="range" min="0" max="100" step="1" onChange={props.volume}></input>
        <button onClick={props.tenBackward}>-10s</button>
        <button onClick={props.tenForward}>+10s</button>
    </div>
);
}
export default UserControls;