import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import profileImage from './assets/profile.jpg'
import './HeaderBar.css'

export default function Header(){
    return(
        <nav>
            <div className="main_text">
                <p>Bill Splitter</p>
            </div>
            <div className="user_icons">
                <div className="bell_icon_container">
                    <FontAwesomeIcon icon={faBell} className="bell_icon"/>
                </div>
                <div className="profile_photo">
                    <img src={profileImage} alt="Profile Image" />
                </div>
            </div>
        </nav>
    );
}