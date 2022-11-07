import "./css/Inbox.css"
import { DownArrow, CreateMessage, MessageFlyer, Smiley } from "../assets/svg/Icons"
import Avatar from "../assets/Images/avatar.jpg"
import Gallary from "../assets/Icons/gallary-icon.png"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../pages/Dashboard"
import api from '../config/backend'

const Inbox = () => {
    const [messages, setMessages] = useState([])
    const [user, setUser] = useState(null)
    const [text, setText] = useState("")

    const {state, actions} = useContext(UserContext)

    useEffect(() => {
        document.title = "Inbox • Chats"

        const token = localStorage.getItem('token')

        const init = async () => {
            const response = await fetch(`${api}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            })

            const data = await response.json()

            const grouped = {}

            data.data.forEach(message => {
                const m = {
                    message: message.message,
                    date: message.date
                }

                if (grouped[message.to] === undefined) {
                    grouped[message.to] = [m]
                } else {
                    grouped[message.to].push(m)
                }
            })

            setMessages(grouped)
        }

        init()
    }, [])

    console.log({messages})

    return (
        <div className="inbox__container">
            <div className="container__box">
                <div className="box_users">
                    <div className="users_header">
                        <h1>{state.user.username}</h1>
                        <DownArrow />
                        <CreateMessage 
                            onClick={() => 
                                actions.setPopup({open: true, origin: "new-message"})
                            }
                        />
                    </div>
                    <div className="users_list">
                        { Object.entries(messages).map(([username, messages], index) => {
                            return (
                                <div 
                                    key={index} 
                                    className="message_overview"
                                    onClick={() => setUser({ username, messages })}
                                >
                                    <img src={Avatar} alt="" />
                                    <div>
                                        <h2>{username}</h2>
                                        <span>
                                            {messages[0].message.length > 35 ? messages[0].message.slice(0, 35) + " ..." : messages[0].message}
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
                <div className="box_message">
                    {user ? (
                        <div className="message__fill">
                            <div className="message_user__info">
                                <img src={Avatar} alt="" />
                                <span>{user.username}</span>
                            </div>
                            <div className="message__body">
                                {user.messages[0].message}
                            </div>
                            <div className="message__typer">
                                <Smiley />
                                <img src={Gallary} alt="" />
                                <input
                                    type="text"
                                    placeholder="Message..."
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                />
                                <button
                                    className={text ? "send-dark" : "send-light"}
                                >Send</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <MessageFlyer />
                            <h1>Your Messages</h1>
                            <span>Send private photos and messages to a friend or group.</span>
                            <button
                                onClick={() => 
                                    actions.setPopup({open: true, origin: "new-message"})
                                }
                            >
                                Send Message
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Inbox
