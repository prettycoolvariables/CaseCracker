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
                    Have a case to crack?
                </div>
                <div className="home-description-container">
                    Then better call CaseCracker.we are professionals in solving cases and providing you with the best possible solution.
                    this website provides a platform for you to ask questions and get answers from our AI.
                    we have two AI's one is for general questions and the other is for legal questions.
                    you can ask any question and we will provide you with the best possible solution.
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
