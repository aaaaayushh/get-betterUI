import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";
import UserInfo from "../../components/userInfo";

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
      const res = await axios.get(
        `http://localhost:3001/post/user/${id.userId}`
      );
      console.log(res);
      setPosts(res.data);
    };
    setLoading(true);
    fetchUser();
    fetchUserPosts();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) {
    return <h1>loading</h1>;
  }
  if (!user) {
    return <></>;
  }
  return (
    <>
      <UserInfo user={user} />
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
