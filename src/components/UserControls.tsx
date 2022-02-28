//Acceptable format for props data.
export interface IUserControlsProps {
    backward: (event: React.MouseEvent<HTMLElement>) => void
    toggle: (event: React.MouseEvent<HTMLElement>) => void,
    forward: (event: React.MouseEvent<HTMLElement>) => void,
}
function UserControls(props:IUserControlsProps){
return(
    <div> 
        <button onClick={props.backward}>backward</button>
        <button onClick={props.toggle}>toggle</button>
        <button onClick={props.forward}>forward</button>
    </div>
);
}
export default UserControls;