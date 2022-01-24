import React, { useCallback, useContext, useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { BiComment } from "react-icons/bi";
import axios from "axios";
import { Button, Input, InputGroup } from "reactstrap";
import { AuthContext } from "../../App";
import styles from "./Post.module.css";
export default function Post({ user, likes, caption, image, _id, timestamp }) {
  const [numLikes, setNumLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState();
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [showAllComments, setshowAllComments] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const { state } = useContext(AuthContext);
  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:3001/post/${_id}/comments`);
      // console.log(res);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [_id]);
  function getElapsedTime(inputTimestamp) {
    const d = new Date(inputTimestamp);
    // console.log(d);
    const currDate = new Date();
    var temp = (currDate.getTime() - d.getTime()) / 1000;
    // console.log(temp);
    if (temp > 60) {
      temp = temp / 60;
      if (temp > 60) {
        temp = temp / 60;
        if (temp > 24) {
          temp = temp / 24;
          return { temp, unit: "days" };
        } else {
          return { temp, unit: "hours" };
        }
      } else {
        return { temp, unit: "minutes" };
      }
    } else {
      return { temp, unit: "seconds" };
    }
  }
  useEffect(() => {
    fetchComments();
    // console.log(getElapsedTime(timestamp));
    setTimeElapsed(getElapsedTime(timestamp));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setNumLikes(likes.length);
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

  const addComment = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3001/post/${_id}/comment`,
        {
          user: JSON.parse(state.user)._id,
          comment,
          post: _id,
        }
      );
      console.log(res);
      fetchComments();
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div
        className={`card col-12 ${styles.postBox} bg-dark text-white rounded`}
      >
        <div className="d-flex align-items-center mt-3">
          <div className="rounded-circle text-center col-1 ">
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt=""
                className="img-fluid rounded-circle col-8"
              />
            ) : (
              <img
                src="/anonymous-user.jpg"
                alt=""
                className="img-fluid rounded-circle col-8"
              />
            )}
          </div>
          <div className="fs-5 ">
            {user.firstname} {user.lastname}
          </div>
        </div>
        <hr />
        {/* post caption */}
        <div className="mx-3 fs-5 mt-1 fw-bold">{caption}</div>
        {image && <img src={image} alt="" className="img-fluid col-12 my-3" />}
        <div className="col-12 d-flex flex-row justify-content-between">
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
              onClick={() => setShowComment(!showComment)}
              style={{ cursor: "pointer", transform: "scale(1.5)" }}
            />
          </div>
          <div className="me-3">
            <span className="fs-6 text-muted">{`${Math.floor(
              timeElapsed.temp
            )} ${timeElapsed.unit} ago`}</span>
          </div>
        </div>
        {showComment && (
          <div className="m-3 mt-0">
            <InputGroup>
              <Input
                className="border-3"
                value={comment}
                required={true}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button color="light" onClick={addComment}>
                Comment
              </Button>
            </InputGroup>
          </div>
        )}

        {/* comments */}
        {showAllComments ? (
          <>
            <div className="me-3 ms-2">
              {comments
                .slice(0)
                .reverse()
                .map((comment) => (
                  <div className="fs-6">
                    <strong className="me-3">
                      {comment.user.firstname} {comment.user.lastname}
                    </strong>
                    {comment.comment}
                  </div>
                ))}
            </div>
            <span
              onClick={() => setshowAllComments(false)}
              className="fs-6 text-muted"
              style={{ cursor: "pointer" }}
            >
              Show less comments
            </span>
          </>
        ) : (
          <div className="me-3 ms-2">
            {comments
              .slice(comments.length - 3, comments.length)
              .map((comment) => (
                <>
                  <div className="fs-6">
                    <strong className="me-3">
                      {comment.user.firstname} {comment.user.lastname}
                    </strong>
                    {comment.comment}
                  </div>
                </>
              ))}
            <span
              className="text-muted fs-6"
              style={{ cursor: "pointer" }}
              onClick={() => setshowAllComments(true)}
            >
              Show all comments
            </span>
          </div>
        )}
      </div>
    </>
  );
}
