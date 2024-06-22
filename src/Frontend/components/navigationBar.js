import "../style/navigationBar.css"
import title from "../assets/navbarimage.png"
const NavigationBar = () => {
    return ( 
        <div className="navigationBar-container">
            <div className="navigation-title">
                <img src={title} alt="" />
                Case Cracker
            </div>
            <div className="navigation-components">
                <span className="nav">Home</span>
                <span className="nav">pages</span>
                <span className="nav">Case Studies</span>
                <span className="nav">Blogs</span>
                <span className="nav">Contact</span>
            </div>
            <div className="about-buttons">

            </div>
        </div>
     );
}
 
export default NavigationBar;