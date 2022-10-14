import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtectedRoute from './config/ProtectedRoute'

import Home from './pages/Home'
import Error from './pages/Error'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='/' element={<ProtectedRoute />}>
          <Route path='dashboard' element={<Dashboard />} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
