import "./css/Main.css"
import { useState,useEffect, useContext } from "react"
import api from '../../config/backend'
import Avatar from '../../assets/Images/avatar.jpg'
import { UserContext } from "../../pages/Dashboard"
import { Link } from "react-router-dom"
import IndividualPost from "../IndividualPost"

const Main = () => {
   const [posts, setPosts] = useState([])

   const {state, actions} = useContext(UserContext)

   useEffect(() => {
      document.title = "Instagram"

      const token = localStorage.getItem('token')

      const init = async () => {
         const response = await fetch(`${api}/posts`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
         })

         const data = await response.json()

         if (data.status == "success") {
            setPosts(data.posts)
         }
      }

      init()
   }, [])

   return (
      <div className="dashboard__main">
         <div className="main__posts_container">
            {posts.map(
               (post, index) => <IndividualPost key={index} postInfo={post} index={index} state={state} />
            )}
         </div>
         <div className="main__suggestions">
            <div className="user-data">
               <img src={Avatar} alt="" />
               <div className="user-info">
                  <div>
                     <Link to="/profile">
                        <h3 className="user-username">{state.user && state.user.username}</h3>
                     </Link>
                     <h4>{state.user && state.user.fullname}</h4>
                  </div>
                  <h3>Switch</h3>
               </div>
            </div>
            <div className="user-suggestions">
               <div>
                  <h3>Suggestions For You</h3>
                  <span>See All</span>
               </div>
               <div>

               </div>
            </div>
         </div>
      </div>
   )
}

export default Main
