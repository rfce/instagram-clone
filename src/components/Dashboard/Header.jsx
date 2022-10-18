import "./css/Header.css"
import { useState, useEffect, useContext } from "react"
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
    Saved,
    Spinner
} from "../../assets/svg/Icons"
import { useNavigate, Link } from "react-router-dom"
import api from "../../config/backend"
import CreatePost from "../CreatePost"
import { UserContext } from "../../pages/Dashboard"

const DashboardHeader = () => {
    const [search, setSearch] = useState("")
    const [debounce, setDebounce] = useState("")
    const [hidden, setHidden] = useState(true)
    const [click, setClick] = useState(0)
    const [searchResult, setSearchResult] = useState([])
    
    const { state, actions } = useContext(UserContext)

    const { popup } = state

    const navigate = useNavigate()

    // Debouncing
    // Reduce the amount of api calls as state "search" will
    //      change only afer one second
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(debounce)
        }, 1000)

        return () => clearTimeout(timer)
    }, [debounce])

    useEffect(() => {
        if (click) {
            localStorage.removeItem("token")
            navigate("/")
        }
    }, [click])

    useEffect(() => {
        const token = localStorage.getItem("token")

        const init = async () => {
            const response = await fetch(`${api}/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ search, token })
            })

            const data = await response.json()

            if (data.status == "success") {
                setSearchResult(data.data)
            }
        }

        if (search) {
            init()
        }
    }, [search])

    return (
        <>
            {popup.open && popup.origin == "post" && <CreatePost />}
            <div className="dashboard__header">
                <div className="header_logo">
                    <div>
                        <Link to="/dashboard">
                            <Instagram />
                        </Link>
                    </div>
                    <DownArrow />
                </div>
                <div className="header_search">
                    <div>
                        <input
                            className={debounce ? "text" : undefined}
                            type="text"
                            value={debounce}
                            onChange={e => setDebounce(e.target.value)}
                        />
                        {!debounce && (
                            <div className="search_icon">
                                <Search />
                                <label>Search</label>
                            </div>
                        )}
                        <div className={debounce ? "arrow" : "hidden"}></div>
                        <div className={debounce ? "search_results" : "hidden"}>
                            { searchResult.length ? (
                                searchResult.map((user, index) => {
                                    return (
                                        <div 
                                            key={index} 
                                            className="result"
                                            onClick={
                                                () => {
                                                    setDebounce("")
                                                    navigate('/profile', {state: { username: user.username }})
                                                }}
                                        >
                                            <div className="result_profile">
                                                <img src={Avatar} alt="avatar" />
                                            </div>
                                            <div className="result_info">
                                                <h2>{user.username}</h2>
                                                <h3>{user.fullname}</h3>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : search ? (
                                <div className="non-existing">
                                    <span>
                                        Username @{search} doesn't exist
                                    </span>
                                </div>
                            ) : <Spinner /> }
                        </div>
                    </div>
                </div>
                <div className="header_buttons">
                    <Link to="/dashboard">
                        <Home />
                    </Link>
                    <Messenger />
                    <NewPost 
                        onClick={() => actions.setPopup({open: true, origin: "post"})}
                    />
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
        </>
    )
}

export default DashboardHeader
