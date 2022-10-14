import './css/Home.css'
import { useEffect } from 'react'

import Footer from '../components/Footer'
import Login from '../components/Login'
import Phone from '../components/Phone'

const Home = () => {
    useEffect(() => {
        document.title = "Instagram"
    }, [])

    return (
        <div className='home'>
            <div className='home__container'>
                <Phone />
                <Login />
            </div>
            <Footer />
        </div>
    )
}

export default Home
