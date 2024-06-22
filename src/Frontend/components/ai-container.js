import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { CiLocationArrow1 } from "react-icons/ci";
import "../style/ai-container.css"
const AiButton = () => {
    const [clicked, setClicked] = useState(false);
    return ( 
        <div className={`ai-container ${clicked?'clicked':''}`} >
            {
                !clicked?(
                    <div onClick={()=>setClicked(!clicked)}>Get a Free consultation</div>
                ):(
                    <div className="ai-chat-box">
                        <div className="ai-chat-box-header">
                            <IoCloseSharp color="black" size={20} onClick={()=>{setClicked(!clicked)}}/>
                        </div>
                        <div className="ai-chat-box-screen">

                        </div>
                        <div className="ai-chat-box-inputs">
                            <input type="text" placeholder="Ask Question.." />
                            <CiLocationArrow1 color="black" size={30}/>
                        </div>
                    </div>
                )
            }
        </div>
     );
}
 
export default AiButton;