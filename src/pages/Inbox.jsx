import "./css/Inbox.css"
import { DownArrow, CreateMessage, MessageFlyer, Smiley } from "../assets/svg/Icons"
import Avatar from "../assets/Images/avatar.jpg"
import Gallary from "../assets/Icons/gallary-icon.png"
import { useState, useEffect, useContext, useRef } from "react"
import { UserContext } from "../pages/Dashboard"
import api from '../config/backend'
import io from "socket.io-client"
import { nanoid } from "nanoid"

const socket = io.connect("http://localhost:5010")

const sendMessage = async (username, message, to) => {
    socket.emit('message', { username, message, to })

    const token = localStorage.getItem('token')

    const response = await fetch(`${api}/send-message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, message, to })
    })

    const data = await response.json()

    console.log({ data })
}

const Inbox = () => {
    const [messages, setMessages] = useState([])
    const [text, setText] = useState("")

    let user, setUser

    const { state, actions } = useContext(UserContext)

    user = state.inbox
    setUser = actions.setInbox

    const one = useRef(true)
    const bottomRef = useRef(null);

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

            if (data.status == 'success') {
                setMessages(data.data)
            }
        }

        init()
    }, [])

    useEffect(() => {
        if (!state.user) return

        socket.emit("join", {
            username: state.user.username
        })

        const handleChat = (data) => {
            setMessages(prev => [
                ...prev,
                {
                    sender: data.from,
                    to: state.user.username,
                    message: data.message,
                    date: data.date
                }
            ])
        }

        socket.on("chat", handleChat)

        return () => {
            socket.off("chat", handleChat)
        }
    }, [state.user])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        })
    }, [messages, user])

    const senderMap = new Map()

    messages.forEach(message => {
        const otherUser =
            message.sender === state.user?.username
                ? message.to
                : message.sender

        senderMap.set(otherUser, {
            username: otherUser,
            last_message: message.message
        })
    })

    const senders = [...senderMap.values()]

    return (
        <div className="inbox__container">
            <div className="container__box">
                <div className="box_users">
                    <div className="users_header">
                        <h1>{state.user && state.user.username}</h1>
                        <DownArrow />
                        <CreateMessage
                            onClick={() =>
                                actions.setPopup({ open: true, origin: "new-message" })
                            }
                        />
                    </div>
                    <div className="users_list">
                        {senders.map(sender => {
                            return (
                                <div
                                    key={nanoid()}
                                    className="message_overview"
                                    onClick={() => setUser({ username: sender.username })}
                                >
                                    <img src={Avatar} alt="" />
                                    <div>
                                        <h2>{sender.username}</h2>
                                        <span>
                                            {sender.last_message.length > 35 ? sender.last_message.slice(0, 35) + " ..." : sender.last_message}
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
                                {messages.map((message, index) => {
                                    return (
                                        message.sender === user.username ||
                                        message.to === user.username
                                    ) ? (
                                        <div
                                            key={index}
                                            className={
                                                message.to === user.username
                                                    ? "message__text_right"
                                                    : "message__text_left"
                                            }
                                        >
                                            <div className="message__bubble">
                                                <span>{message.message}</span>
                                                <small className="message__time">
                                                    {new Date(message.date).toLocaleTimeString([], {
                                                        hour: "numeric",
                                                        minute: "2-digit",
                                                    })}
                                                </small>
                                            </div>
                                        </div>
                                    ) : null;
                                })}

                                <div ref={bottomRef} />
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
                                    onClick={() => {
                                        text && sendMessage(state.user.username, text, user.username)
                                        setMessages(prev => {
                                            return [
                                                ...prev,
                                                {
                                                    sender: state.user.username,
                                                    to: user.username,
                                                    message: text,
                                                    date: new Date()
                                                }
                                            ]
                                        })
                                        setText("")
                                    }}
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
                                    actions.setPopup({ open: true, origin: "new-message" })
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
