import "./css/Main.css"
import { useState, useEffect, useContext } from "react"
import api from '../../config/backend'
import Avatar from '../../assets/Images/avatar.jpg'
import { UserContext } from "../../pages/Dashboard"
import { Link } from "react-router-dom"
import IndividualPost from "../IndividualPost"
import Suggestion from "../Suggestion"
import { nanoid } from "nanoid"

const Main = () => {
   const [posts, setPosts] = useState([])

   const { state, actions } = useContext(UserContext)

   useEffect(() => {
      document.title = "Instagram"

      const token = localStorage.getItem("token")

      const controller = new AbortController()
      let cancelled = false

      const init = async () => {
         setPosts([])

         const response = await fetch(`${api}/posts`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({ token }),
            signal: controller.signal
         })

         const data = await response.json()

         if (cancelled) return

         if (data.status === "success") {
            for (const item of data.posts) {

               const res = await fetch(`${api}/posts/${item.hash}`, {
                  method: "POST",
                  headers: {
                     "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ token }),
                  signal: controller.signal
               })

               const post = await res.json()

               if (cancelled) return

               if (post.status === "success") {
                  setPosts(prev => [...prev, post.post])
               }
            }
         }
      }

      init()

      return () => {
         cancelled = true
         controller.abort()
      }
   }, [])

   const popular = ["noeycodes", "hannah", "nomadlist", "python-dev", "pramela"]

   return (
      <div className="dashboard__main">
         <div className="main__posts_container">
            {posts.map(
               post => <IndividualPost key={post.hash} postInfo={post} state={state} />
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
               <div className="suggestions-box">
                  {popular.map(username => {
                     return (
                        <Suggestion
                           key={nanoid()}
                           username={username}
                           description="Popular"
                           followed={state.user && state.user.following.includes(username)}
                           actions={actions}
                        />
                     )
                  })}
               </div>
            </div>
         </div>
      </div>
   )
}

export default Main
