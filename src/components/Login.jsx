import logo from '../assets/Images/Instagram.png'
import facebookIcon from '../assets/Icons/Facebook.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const canLogin = username.length > 4 && password.length > 4

    return (
        <div className="auth-container">
            <div className="login">
                <img src={logo} alt="Instagram logo" />
                <div className="form-input">
                    <label className={username ? 'label-u__hover-in' : 'label__hover-out'}>
                        Phone number, username, or email
                    </label>
                    <input
                        type="text" 
                        name="username" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-input">
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
