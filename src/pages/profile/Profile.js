import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";

export default function Profile() {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const id = useParams("userId");
  // console.log(id);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:3001/user/getUser/${id.userId}`
      );
      console.log(res);
      setUser(res.data.user);
    };
    const fetchUserPosts = async () => {
      const res = await axios.get(`http://localhost:3001/post/${id.userId}`);
      console.log(res);
      setPosts(res.data);
    };
    setLoading(true);
    fetchUser();
    fetchUserPosts();
    setLoading(false);
  }, [id]);
  if (loading) {
    return <h1>loading</h1>;
  }
  if (!user) {
    return <></>;
  }
  return (
    <>
      <div className="card col-8 mx-auto shadow-lg d-flex flex-row">
        <div className="col-1 m-3">
          {user.profilePic ? (
            <img
              src={user.profilePic}
              className="img-fluid rounded-circle col-12"
              alt=""
            />
          ) : (
            <img
              src="/anonymous-user.jpg"
              className="rounded-circle img-fluid col-12"
              alt=""
            />
          )}
        </div>
        <div className="col-8 my-auto ms-3">
          <span className="fs-3 fw-bold">
            {user.firstname} {user.lastname}
          </span>
          <br />
          <small className="fw-bolder ms-1">{user.username}</small>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="col-6 mt-5 mx-auto">
          {posts &&
            posts.map((post, key) => (
              <Post
                key={key}
                user={post.user}
                likes={post.likes}
                caption={post.caption}
                image={post.image}
                _id={post._id}
              />
            ))}
        </div>
      )}
    </>
  );
}
