
import './MainButtonStyle.scss'


export default function MainButton(props){
    return (
       <div className="containerButton"> 
         <h1>{props.icon}</h1>
         <p>{props.text}</p>
       </div>
    );
}