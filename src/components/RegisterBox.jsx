import "./css/RegisterBox.css"
import { useState } from "react"
import { Link } from "react-router-dom"
import instagramLogo from "../assets/Images/Instagram.png"
import facebookIcon from "../assets/Icons/facebookWhite.png"

const RegisterBox = () => {
    const [contact, setContact] = useState("")
    const [fullname, setFullname] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const canRegister = contact.length > 4 && fullname.length > 4 && username.length > 4 && password.length > 4

    return (
        <>
            <div className="register__container">
                <img src={instagramLogo} alt="Instagram logo" />
                <h2>Sign up to see photos and videos from your friends.</h2>
                <div className="register__facebook_login">
                    <img src={facebookIcon} alt="Facebook icon" />
                    Log in with Facebook
                </div>
                <div className="register__seperator">
                    <h2>OR</h2>
                </div>
                <div className="register__inputs">
                    <div>
                        <label className={contact ? 'label-c__hover-in' : 'label__hover-out'}>
                            Mobile Number or Email
                        </label>
                        <input
                            type="text"
                            name="contact"
                            value={contact}
                            onChange={e => setContact(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className={fullname ? 'label__hover-in' : 'label__hover-out'}>
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullname"
                            value={fullname}
                            onChange={e => setFullname(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className={username ? 'label__hover-in' : 'label__hover-out'}>
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className={password ? 'label__hover-in' : 'label__hover-out'}>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="register__terms">
                    <p>
                        People who use our service may have uploaded your contact information to Instagram. <span>Learn More</span>
                    </p>
                    <p>
                        By signing up, you agree to our <span>Terms</span> , <span>Privacy Policy</span> and <span>Cookies Policy</span> .
                    </p>
                </div>
                <button className={canRegister ? "clickable" : undefined}>
                    Sign up
                </button>
            </div>
            <div className="register__hint">
                <p>Have an account?</p>
                <Link to="/">Log in</Link>
            </div>
        </>
    )
}

export default RegisterBox
