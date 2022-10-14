import "./css/Login.css"
import { useState } from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/Images/Instagram.png'
import facebookIcon from '../assets/Icons/Facebook.png'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const canLogin = username.length > 4 && password.length > 4

    return (
        <div className="home__login">
            <div className="login">
                <img src={logo} alt="Instagram logo" />
                <div className="login_input">
                    <label className={username ? 'label-u__hover-in' : 'label__hover-out'}>
                        Phone number, username, or email
                    </label>
                    <input
                        type="text" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="login_input">
                    <label className={password ? 'label__hover-in' : 'label__hover-out'}>
                        Password
                    </label>
                    <input
                        type="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button className={canLogin ? "clickable" : undefined}>
                    Log In
                </button>
                <div className="seperator">
                    <div></div>
                    <div className="seperator-text">OR</div>
                    <div></div>
                </div>
                <button className='facebook-login'>
                    <img src={facebookIcon} alt='Facebook icon'/>
                    <span>Log in with Facebook</span>
                </button>
                {/* 
                    The username you entered doesn't belong to an account. Please check your username and try again. 
                    Sorry, your password was incorrect. Please double-check your password.
                */}
                <div className={message ? "message-box" : "message-box hidden"}>
                    <span>{message}</span>
                </div>
                <Link to="/reset-password">
                    Forgot password?
                </Link>
            </div>
            <div className="register">
                <p>Don't have an account?</p>
                <Link to="/register">
                    Sign up
                </Link>
            </div>
        </div>
    )
}

export default Login
