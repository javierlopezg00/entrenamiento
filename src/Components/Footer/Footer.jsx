import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BiDumbbell, BiNews } from "react-icons/bi";
import { MdLightbulbOutline } from "react-icons/md";
import MainButton from "../MainButtons/MainButton";

export default function Footer(){

    return(
        <div>
            <div className="footer">
                <MainButton text="Home" icon={<AiOutlineHome/>} link="/"></MainButton>
                <MainButton text="News" icon={<BiNews/>} link="/diet"></MainButton>
                <MainButton text="Coach" icon={<BiDumbbell/>} link="/coach"></MainButton>
                <MainButton text="Tips" icon={<MdLightbulbOutline/>} link="/diet"></MainButton>
                <MainButton text="Profile" icon={<AiOutlineUser/>} link="/Profile"></MainButton>
            </div>
        </div>
    );
}