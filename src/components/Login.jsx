import logo from '../assets/Images/Instagram.png'
import facebookIcon from '../assets/Icons/Facebook.png'
import { useState } from 'react'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="auth-container">
            <div className="login">
                <img src={logo} alt="Instagram logo" />
                <div className="form-input">
                    <label>Phone number, username, or email</label>
                    <input
                        type="text" 
                        name="username" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-input">
                    <label>Password</label>
                    <input
                        type="password" 
                        name="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button>Log In</button>
                <div className="seperator">
                    <div></div>
                    <div className="seperator-text">OR</div>
                    <div></div>
                </div>
                <button className='facebook-login'>
                    <img src={facebookIcon} alt='Facebook icon'/>
                    <span>Log in with Facebook</span>
                </button>
                <a href='/reset-password'>Forgot password?</a>
            </div>
            <div className="register">
                <p>Don't have an account?</p>
                <a href='/register'>Sign up</a>
            </div>
        </div>
    )
}

export default Login
