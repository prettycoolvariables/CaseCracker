import { CiLinkedin } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";

import "../style/navigationBar.css"
import title from "../assets/navbarimg.png"
const NavigationBar = () => {
    return ( 
        <div className="navigationBar-container">
            <div className="navigation-title">
                <img src={title} alt="" />
                Case Cracker
            </div>
            <div className="navigation-components">
                <span className="nav">Home</span>
                <span className="nav">Case studies</span>
                <a className="nav" href="https://youtube.com/shorts/SXHMnicI6Pg?si=pFE7oKyo7vKME_m_">Blogs</a>
                <span className="nav">Contact</span>
            </div>
            <div className="about-buttons">
                {/* <CiLinkedin color="white" size={30}/>
                <FaYoutube color="white" size={30}/>
                <CiTwitter color="white" size={30}/> */}
                <input type="button" value="Free Consultation   " />
            </div>
        </div>
     );
}
 
export default NavigationBar;