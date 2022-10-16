import "./css/Profile.css"
import Footer from "../components/Footer"
import { DownArrow, Settings, ThreeDots } from "../assets/svg/Icons"
import ProfilePhoto from "../assets/Images/avatar-large.jpg"
import { useEffect, useContext } from "react"
import api from "../config/backend"
import { UserContext } from "./Dashboard"
import { useState } from "react"
import { useLocation } from "react-router-dom"

const Profile = () => {
    // User's own data set globally
    const { state, actions } = useContext(UserContext)

    const user = state.user
    
    const location = useLocation()

    const [profile, setProfile] = useState(null)

    // Handle search for another user profile
    // Note - location.state contains username of searched user
    useEffect(() => {
        const token = localStorage.getItem("token")

        const init = async () => {
            const response = await fetch(`${api}/info`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token, 
                    username: location.state.username 
                })
            })

            const data = await response.json()

            if (data.status == "success") {
                setProfile(data.data)
                document.title = `${data.data.fullname} (@${data.data.username})`
            }
        }

        if (location.state) {
            init()
        } else {
            setProfile(null)
        }
    }, [location.state])

    // Handle user profile
    useEffect(() => {
        const token = localStorage.getItem("token")

        const init = async () => {
            const response = await fetch(`${api}/profile`, {
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

    // Handle posts, followers and following count
    // Profile isn't null   => user searched for another profile
    //                      => const 'profile' stores searched profile data
    // Profile is null      => return user his/her own data
    const length = (link) => {
        if (profile) {
            return profile.profile == "Private" ? profile[link] : profile[link].length
        }

        return user ? user[link].length : 0
    }

    return (
        <div className="profile__container">
            <div className="profile_user">
                <div className="user_photo">
                    <img src={ProfilePhoto} alt="" />
                </div>
                <div className="user_info">
                    <div>
                        <h2>
                            {profile ? profile.username : user ? user.username : ""}
                        </h2>
                        {profile ? (
                            <div className="follow">
                                <button>
                                    Message
                                </button>
                                <button className="follow-btn">
                                    Follow
                                </button>
                                <div className="down-arrow">
                                    <DownArrow />
                                </div>
                                <ThreeDots />
                            </div>
                        ) : (
                            <>
                                <button>Edit profile</button>
                                <Settings />
                            </>
                        )}
                    </div>
                    <div className="user_follow">
                        <div>
                            <span>{length("posts")}</span>
                            <span>posts</span>
                        </div>
                        <div>
                            <span>{length("followers")}</span>
                            <span>followers</span>
                        </div>
                        <div>
                            <span>{length("following")}</span>
                            <span>following</span>
                        </div>
                    </div>
                    <div className="profile_username">
                        <h2>
                            {profile ? profile.fullname : user ? user.fullname : "Guest"}
                        </h2>
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
