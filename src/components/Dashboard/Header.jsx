import "./css/Header.css"
import { useState, useEffect } from "react"
import Avatar from "../../assets/Images/avatar.jpg"
import {
    Instagram, 
    DownArrow, 
    Search, 
    Home,
    Messenger, 
    NewPost, 
    FindPeople, 
    ActivityFeed,
    Profile,
    Saved
} from "../../assets/svg/Icons"
import { useNavigate, Link } from "react-router-dom"

const DashboardHeader = () => {
    const [search, setSearch] = useState("")
    const [hidden, setHidden] = useState(true)
    const [click, setClick] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        if (click) {
            localStorage.removeItem("token")
            navigate("/")
        }
    }, [click])

    return (
        <div className="dashboard__header">
            <div className="header_logo">
                <div>
                    <Instagram />
                </div>
                <DownArrow />
            </div>
            <div className="header_search">
                <div>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <div className="search_icon">
                        <Search />
                        <label>Search</label>
                    </div>
                </div>
            </div>
            <div className="header_buttons">
                <Home />
                <Messenger />
                <NewPost />
                <FindPeople />
                <ActivityFeed />
                <div 
                    className="header_avatar"
                    onClick={() => setHidden(prev => !prev)}
                >
                    <img src={Avatar} alt="avatar" />
                    <div className={hidden ? "arrow hidden" : "arrow"}></div>
                    <div className={hidden ? "avatar_menu hidden" : "avatar_menu"}>
                        <ul>
                            <Link to="/profile">
                                <li>
                                    <Profile />
                                    <span>Profile</span>
                                </li>
                            </Link>
                            <li>
                                <Saved />
                                <span>Saved</span>
                            </li>
                            <li
                                onClick={() => setClick(prev => prev + 1)}
                            >Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader
