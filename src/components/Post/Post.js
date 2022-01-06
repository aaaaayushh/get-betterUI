import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { BiComment } from "react-icons/bi";
import { AuthContext } from "../../App";
import axios from "axios";
export default function Post({ user, likes, caption, image, comments, _id }) {
  const [numLikes, setNumLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const { state } = useContext(AuthContext);
  useEffect(() => {
    setNumLikes(likes.length);
    console.log(likes);
    //find if current user has liked this post
    if (likes.find(({ _id }) => _id === JSON.parse(state.user)._id)) {
      setLiked(true);
    }
  }, [likes, state.user]);
  const likePost = async () => {
    try {
      await axios.post(`http://localhost:3001/post/${_id}/like`, {
        id: JSON.parse(state.user)._id,
      });
      // console.log(res);
      setLiked(true);
      setNumLikes(numLikes + 1);
    } catch (err) {
      console.log(err);
    }
  };
  const unlikePost = async () => {
    try {
      await axios.post(`http://localhost:3001/post/${_id}/unlike`, {
        id: JSON.parse(state.user)._id,
      });
      // console.log(res);
      setLiked(false);
      setNumLikes(numLikes - 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="card col-12">
        <div className="d-flex my-auto">
          <div className="rounded-circle mt-1">
            <img
              src="https://images.indianexpress.com/2021/01/myntra.png"
              alt=""
              className="img-fluid"
              style={{ width: "5em" }}
            />
          </div>
          <div className="fs-5 mt-2">
            {user.firstname} {user.lastname}
          </div>
        </div>
        {/* post caption */}
        <div className="mx-3 fs-5 mt-1 fw-bold">{caption}</div>
        {image && <img src={image} alt="" className="img-fluid col-12 my-3" />}
        <div className="ms-3 mb-3">
          <span className="me-2">{numLikes}</span>
          {liked ? (
            <FcLike
              className="me-3"
              style={{ cursor: "pointer", transform: "scale(1.5)" }}
              onClick={unlikePost}
            />
          ) : (
            <AiOutlineHeart
              style={{ cursor: "pointer", transform: "scale(1.5)" }}
              className="me-3"
              onClick={likePost}
            />
          )}
          <BiComment
            className="me-2"
            style={{ cursor: "pointer", transform: "scale(1.5)" }}
          />
        </div>

        {/* comments */}

        <div className="mx-3">
          {comments.map((comment) => (
            <div className="fs-65">
              <strong>
                {comment.user.firstname} {comment.user.lastname}
              </strong>
              {comment.comment}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
