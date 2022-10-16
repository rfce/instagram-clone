import "./css/Profile.css"
import Footer from "../components/Footer"
import { Settings } from "../assets/svg/Icons"
import ProfilePhoto from "../assets/Images/avatar-large.jpg"
import { useEffect, useContext } from "react"
import api from "../config/backend"
import { UserContext } from "./Dashboard"

const Profile = () => {
    const { state, actions } = useContext(UserContext)

    const user = state.user

    useEffect(() => {
        const token = localStorage.getItem("token")

        const init = async () => {
            const response = await fetch(`${api}/info`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            })

            const data = await response.json()

            if (data.status == "success") {
                actions.setUser(data.data)
            }
        }

        if (user === null) {
            init()
        } else {
            document.title = `${user.fullname} (@${user.username})`
        }
    }, [user])

    return (
        <div className="profile__container">
            <div className="profile_user">
                <div className="user_photo">
                    <img src={ProfilePhoto} alt="" />
                </div>
                <div className="user_info">
                    <div>
                        <h2>{user ? user.username : ""}</h2>
                        <button>Edit profile</button>
                        <Settings />
                    </div>
                    <div className="user_follow">
                        <div>
                            <span>{user ? user.posts.length : 0}</span>
                            <span>posts</span>
                        </div>
                        <div>
                            <span>{user ? user.followers.length : 0}</span>
                            <span>followers</span>
                        </div>
                        <div>
                            <span>{user ? user.following.length : 0}</span>
                            <span>following</span>
                        </div>
                    </div>
                    <div className="profile_username">
                        <h2>{user ? user.fullname : "Guest"}</h2>
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
