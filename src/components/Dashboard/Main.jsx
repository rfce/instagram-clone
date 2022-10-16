import { useEffect } from "react"
import "./css/Main.css"

const Main = () => {
   useEffect(() => {
      document.title = "Instagram"
   }, [])

   return (
      <div className="dashboard__main">

      </div>
   )
}

export default Main
