import { useState } from "react"
import "./css/Dashboard.css"
import Avatar from "../assets/Images/avatar.jpg"
import {
    Instagram, 
    DownArrow, 
    Search, 
    Home,
    Messenger, 
    NewPost, 
    FindPeople, 
    ActivityFeed 
} from "../assets/svg/Icons"

const Dashboard = () => {
    const [search, setSearch] = useState("")

    return (
        <div className="dashboard__container">
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
                    <div className="header_avatar">
                        <img src={Avatar} alt="avatar" />
                    </div>
                </div>
            </div>
            <div className="dashboard__main">

            </div>
        </div>
    )
}

export default Dashboard
