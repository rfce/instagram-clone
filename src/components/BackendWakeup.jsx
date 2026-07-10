import { useEffect, useRef, useState } from "react"
import "./css/BackendWakeup.css"

const messages = [
    "Preparing your workspace...",
    "Checking backend availability...",
    "Waking cloud services...",
    "Starting application server...",
    "Almost there...",
    "Establishing secure connection...",
]

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const BackendWakeup = () => {
    const [visible, setVisible] = useState(false);
    const [messageIndex, setMessageIndex] = useState(0)

    const connectedRef = useRef(false)

    const pingBackend = async () => {
        while (true) {
            try {
                const res = await fetch(
                    "https://instagram-clone-kvfg.onrender.com/api/keep-alive",
                    {
                        cache: "no-store",
                    }
                )

                if (res.ok) {
                    connectedRef.current = true

                    break
                }
            } catch { }

            await delay(3000)
        }

        setVisible(false)
    }

    useEffect(() => {
        const messageInterval = setInterval(() => {
            setMessageIndex((i) => (i + 1) % messages.length)
        }, 3000)

        const isConnected = setTimeout(() => {
            if (connectedRef.current === false) {
                setVisible(true)
            }
        }, 2000)

        pingBackend()

        return () => {
            clearTimeout(isConnected)
            clearInterval(messageInterval)
        }
    }, [])

    return (
        <div className="_2xdf">
            <div className={`backend-toast ${visible ? "show" : "hide"}`}>
                <div className="icon-wrapper">
                    <div className="pulse"></div>
                    <div className="icon">
                        <svg
                            viewBox="0 0 24 24"
                            className="bolt-icon"
                            aria-hidden="true"
                        >
                            <path
                                d="M13.2 2L5 13h5l-1.2 9L19 10h-5l-.8-8z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                </div>

                <div className="content">
                    <h4>Starting Services</h4>

                    <div key={messageIndex} className="message fade-message">
                        {messages[messageIndex]}
                    </div>

                    <div className="subtitle">
                        This may take 30–90 seconds after inactivity.
                    </div>

                    <div className="loader">
                        <div className="loader-bar"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BackendWakeup
