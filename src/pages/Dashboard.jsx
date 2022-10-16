import { Outlet } from "react-router-dom"
import Header from "../components/Dashboard/Header"
import { useState, createContext } from "react"

export const UserContext = createContext()

const Dashboard = () => {
    const [user, setUser] = useState(null)

    const value = {
        state: { user },
        actions: { setUser }
    }

    return (
        <div className="dashboard__container">
            <Header />
            <UserContext.Provider value={value}>
                <Outlet />
            </UserContext.Provider>
        </div>
    )
}

export default Dashboard
