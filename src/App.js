import './App.css'
import Footer from './components/Footer'
import Login from './components/Login'
import Phone from './components/Phone'

function App() {
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

export default App
