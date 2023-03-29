import { AiOutlineHome,  } from "react-icons/ai";
import MainButton from "../MainButtons/MainButton";


export default function Footer(){

    return(
        <div>
            <div className="footer">
                <MainButton text="Home" icon={<AiOutlineHome/>}></MainButton>
                <MainButton text="News" icon={<AiOutlineHome/>}></MainButton>
                <MainButton text="Coach" icon={<AiOutlineHome/>}></MainButton>
                <MainButton text="Tips" icon={<AiOutlineHome/>}></MainButton>
                <MainButton text="Profile" icon={<AiOutlineHome/>}></MainButton>
            </div>
        </div>
    );
}