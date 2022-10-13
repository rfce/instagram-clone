import './css/Home.css'
import Footer from '../components/Footer'
import Login from '../components/Login'
import Phone from '../components/Phone'

const Home = () => {
    return (
        <div className='landing-page'>
            <div className='container'>
                <Phone />
                <Login />
            </div>
            <Footer />
        </div>
    )
}

export default Home
