// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import { Avatar } from "@mui/material";
// import React from "react";
// import "./Post.css";
// // import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// // import TelegramIcon from "@mui/icons-material/Telegram";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

// function Post({ user, postImage, likes, timestamp }) {
//   return (
//     <div className="post">
//       <div className="post__header">
//         <div className="post__headerAuthor">
//           <Avatar style={{ marginRight: "10px" }}>
//             {user.charAt(0).toUpperCase()}
//           </Avatar>{" "}
//           {user} • <span>{timestamp}</span>
//         </div>
//         <MoreHorizIcon />
//       </div>
//       <div className="post__image">
//         <img src={postImage} alt="Post Image" />
//       </div>
//       <div className="post__footer">
//         <div className="post__footerIcons">
//           <div className="post__iconsMain">
//             {/* <FavoriteBorderIcon className="postIcon" /> */}
//             <ChatBubbleOutlineIcon className="postIcon" />
//             {/* <TelegramIcon className="postIcon" /> */}
//           </div>
//           <div className="post__iconSave">
//             <BookmarkBorderIcon className="postIcon" />
//           </div>
//         </div>
//         Liked by {likes} people.
//       </div>
//     </div>
//   );
// }

// export default Post;
import {FaEllipsisH} from 'react-icons/fa'
import {AiOutlineHeart,AiOutlineComment} from 'react-icons/ai'
import {BiPaperPlane} from 'react-icons/bi'
import {BsBookmarks} from 'react-icons/bs'
import Avatar from "@material-ui/core/Avatar"
import './Post.css'
import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { doc, collection, onSnapshot,addDoc,serverTimestamp,query,orderBy } from "firebase/firestore";


const Post = ({postID,username,ImageURL,comment}) => {
    const[userComments,setuserComments]=useState([]);
    const[userComment,setuserComment]=useState('');
    useEffect(() => {
        let unsubscribe;
        if (postID) {
          const postRef = doc(db, "post", postID);
          const commentsRef = query(
            collection(postRef, "userComments"),
            orderBy("timestamp", "asc")
          );
          unsubscribe = onSnapshot(commentsRef, (snapshot) => {
            setuserComments(snapshot.docs.map((doc) => doc.data()));
          });
        }
        return () => {
          unsubscribe && unsubscribe();
        };
      }, [postID]);

      const postComment = (event) => {
        event.preventDefault();
        addDoc(collection(doc(db, "post", postID), "userComments"), {
          text: userComment,
          username: "Unknown",
          timestamp: serverTimestamp()
        })
        setuserComment("");
      };
      
    return ( 
        <div className="post">
                    <div className="post_title">
                        <div className="post_left">
                            <div className="profile">
                                <Avatar className="Profile_pic" alt='Profile' />
                            </div>
                            <div className="name">
                                <b>{username}</b>
                            </div>
                        </div>
                        <div className="post_right">
                            <div className="ellip">
                                <FaEllipsisH/>
                            </div>
                        </div>
                    </div>
                    <div class="image">
                        <img src={ImageURL} alt="img1" />
                    </div>
                    <div className="post_footer">
                        <div className="icons">
                            <div className="post_left">
                                <div class="comment">
                                    <AiOutlineHeart/>
                                    <AiOutlineComment/>
                                    <BiPaperPlane/>
                                </div>
                            </div>
                            <div className="post_right">
                                <div class="save"><BsBookmarks/></div>
                            </div>
                        </div>
                        <div className="details">
                            <div className="comments">{comment}</div>
                        </div>
                        <div className="post_comments">
                        {   
                            userComments.map((comment) => (
                                <p>
                                    <strong>{comment.username}</strong> {comment.text}
                                </p>
                        ))}
                        </div>

                        <div className="write mild">
                            <div className="left_side">
                                <input type="text" placeholder="Add a comment...."  value={userComment} onChange={(e)=>setuserComment(e.target.value)}/>
                            </div>
                            <div className="right_side">
                                <button disabled={!userComment} type='submit' onClick={postComment}>Post</button>
                            </div>
                        </div>
                    </div>
                </div>
     );
}
 
export default Post;
