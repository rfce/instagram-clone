import "./css/Profile.css"
import Footer from "../components/Footer"
import { Settings } from "../assets/svg/Icons"
import ProfilePhoto from "../assets/Images/avatar-large.jpg"

const Profile = () => {
    return (
        <div className="profile__container">
            <div className="profile_user">
                <div className="user_photo">
                    <img src={ProfilePhoto} alt="" />
                </div>
                <div className="user_info">
                    <div>
                        <h2>vegnomsim</h2>
                        <button>Edit profile</button>
                        <Settings />
                    </div>
                    <div className="user_follow">
                        <div>
                            <span>0</span>
                            <span>posts</span>
                        </div>
                        <div>
                            <span>0</span>
                            <span>followers</span>
                        </div>
                        <div>
                            <span>0</span>
                            <span>following</span>
                        </div>
                    </div>
                    <div className="profile_username">
                        <h2>Steve Aoki</h2>
                    </div>
                </div>
            </div>
            <div className="profile_posts">
                Getting Started
            </div>
            <Footer />
        </div>
    )
}

export default Profile
