import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BiDumbbell, BiNews } from "react-icons/bi";
import { MdLightbulbOutline } from "react-icons/md";
import MainButton from "../MainButtons/MainButton";

export default function Footer(){

    function signOut() {
        localStorage.setItem("username", "");
        window.location.reload(false);
    }

    return(
        <div>
            {JSON.parse(localStorage.getItem("username"))!=""?
            <div className="footer">
                <MainButton text="Home" icon={<AiOutlineHome/>} link="/"></MainButton>
                <MainButton text="Diet" icon={<BiNews/>} link="/diet"></MainButton>
                <MainButton text="Coach" icon={<BiDumbbell/>} link="/coach"></MainButton>
                <MainButton text="Profile" icon={<AiOutlineUser/>} link="/Profile"></MainButton>
                <div className="containerButton" onClick={signOut}>
                        <h1>{<MdLightbulbOutline/>}</h1>
                        <p>Logout</p>
                </div>
            </div>:
            <div className="footer">
                <MainButton text="SignIn" icon={<AiOutlineUser/>} link="/SignIn"></MainButton>
                <MainButton text="SignUp" icon={<MdLightbulbOutline/>} link="/SignUp"></MainButton>
            </div>
            }
        </div>
    );
}