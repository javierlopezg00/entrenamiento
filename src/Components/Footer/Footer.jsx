import { useEffect } from "react";

import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BiDumbbell, BiNews } from "react-icons/bi";
import { MdLightbulbOutline } from "react-icons/md";
import MainButton from "../MainButtons/MainButton";
import { useNavigate } from 'react-router-dom';

export default function Footer(){
    const history = useNavigate();

    useEffect(() => {
      console.log(localStorage.getItem("username"));
    }, []);
    

    function signOut() {
        // Remove the username from local storage
        localStorage.removeItem("username");

        history("/SignIn");
    }

    return(
        <div>
            {localStorage.getItem("username") ?
            <div className="footer">
                {/* <MainButton text="Home" icon={<AiOutlineHome/>} link="/Register"></MainButton> */}
                <MainButton text="Diet" icon={<BiNews/>} link="/diet"></MainButton>
                <MainButton text="Coach" icon={<BiDumbbell/>} link="/coach"></MainButton>
                <MainButton text="Profile" icon={<AiOutlineUser/>} link="/Profile"></MainButton>
                <div className="containerButton" onClick={signOut}>
                        <h1>{<MdLightbulbOutline/>}</h1>
                        <p>Logout</p>
                </div>
            </div>
                :
            <div className="footer">
                <MainButton text="SignIn" icon={<AiOutlineUser/>} link="/SignIn"></MainButton>
                <MainButton text="SignUp" icon={<MdLightbulbOutline/>} link="/SignUp"></MainButton>
            </div>
            }
        </div>
    );
}