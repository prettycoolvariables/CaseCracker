import { MdArrowOutward } from "react-icons/md";
import { CgInfo } from "react-icons/cg";
import judge from "../assets/judge.png";
import "../style/homepage.css";
import { useState } from "react";
import AiButton from "./ai-container";
import IpcAi from "./ipcAi";

const Home = () => {

    return ( 
        <div className="home-container">
            <div className="text-container">
                <div className="text-title">
                    Having legal issues?        
                </div>
                <div className="home-description-container">
                    Then better call CaseCracker.
                </div>
                <div className="button-container">
                    <AiButton/>
                    <div className="secondButton">
                        <IpcAi/>
                    </div>
                </div>
            </div>
            <div className="image-container">
                <img src={judge} alt="" />
            </div>
        </div>
    );
}

export default Home;
