import { Outlet } from "react-router-dom"
import Header from "../components/Dashboard/Header"

const Dashboard = () => {
    return (
        <div className="dashboard__container">
            <Header />
            <Outlet />
        </div>
    )
}

export default Dashboard
