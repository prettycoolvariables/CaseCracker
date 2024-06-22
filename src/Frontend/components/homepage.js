import { MdArrowOutward } from "react-icons/md";
import { CgInfo } from "react-icons/cg";
import justice from "../assets/justice (2).png"
import judge from "../assets/judge.png"
import "../style/homepage.css"
const Home = () => {
    return ( 
        <div className="home-container">
            <div className="text-container">
                <div className="text-title">
                    We are Expert in Legal Specialities
                </div>
                <div className="home-description-container">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam fugit ullam esse. Est at quam eveniet, rem voluptatum perferendis saepe explicabo sunt, vitae doloribus, unde ipsum obcaecati alias inventore sint.
                </div>
                <div className="button-container">
                    <div className="firstButton">
                        <input type="button" value="Get Free Consultation" />
                        <MdArrowOutward size={15}/>
                    </div>
                    <div className="secondButton">
                        <input className="secondButton" type="button" value="Practise Area" />
                        <CgInfo size={25} opacity={0.7}/>
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