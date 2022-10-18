import { useState,useEffect, useRef, useContext } from "react"
import "./css/Main.css"
import api from '../../config/backend'
import {Buffer} from 'buffer'
import { Comment, Heart, Share, Smiley } from "../../assets/svg/Icons"
import Avatar from '../../assets/Images/avatar.jpg'
import ReactTimeAgo from 'react-time-ago'
import { UserContext } from "../../pages/Dashboard"
import { Link, useNavigate } from "react-router-dom"

const Main = () => {
   const [posts, setPosts] = useState([])
   const [textarea, setTextarea] = useState("")
   const [height, setHeight] = useState(17)

   const {state, actions} = useContext(UserContext)

   const navigate = useNavigate()

   const text = useRef()

   // Handle resize comment box
   useEffect(() => {
      if (text.current) {
         const offsetHeight = text.current.offsetHeight
         const scrollHeight = text.current.scrollHeight

         if (scrollHeight > offsetHeight) {
            setHeight(scrollHeight)
         }
      }
      
      if (textarea === "") { setHeight(17) }
   }, [textarea])

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
            {
               posts.map((post, index) => {
                  return (
                     <div key={index} className="post-box">
                        <div className="post-username">
                           <img src={Avatar} alt="" />
                           <span 
                              onClick={() => navigate('/profile', state.user.username == post.username ? undefined : { state: {username: post.username} })}
                           >
                              {post.username}
                           </span>
                        </div>
                        <div className="post-photo">
                           <img
                              src={"data:" + post.photo.contentType + ";base64, " + Buffer.from(post.photo.data).toString('base64')}
                              alt=""
                           />
                        </div>
                        <div className="post-comments">
                           <div className="post-reactions">
                              <Heart />
                              <Comment />
                              <Share />
                           </div>
                           <div className="post-likes">
                              {post.likes.length} likes
                           </div>
                           {post.caption && (
                              <div className="post-caption">
                                 <span>{post.username}</span>
                                 <span>{post.caption}</span>
                              </div>
                           )}
                           <div className="post-total-comments">
                              View all {post.comments.length} comments
                           </div>
                           <div className="post-date">
                              <ReactTimeAgo date={Date.parse(post.date)} locale="en-US" />
                           </div>
                        </div>
                        <div className="post-add-comment">
                           <div>
                              <Smiley />
                              <textarea 
                                 ref={text}
                                 style={{height: height + 'px'}}
                                 className='comment-box'
                                 placeholder="Add a comment..." 
                                 value={textarea}
                                 onChange={e => setTextarea(e.target.value)}
                              />
                           </div>
                           <span
                              className={textarea ? "active" : "disabled"}
                           >
                              Post
                           </span>
                        </div>
                     </div>
                  )
               })
            }
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
