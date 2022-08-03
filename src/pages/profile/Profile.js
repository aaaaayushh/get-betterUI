import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";
import UserInfo from "../../components/userInfo";

export default function Profile() {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = useParams("userId");
  // console.log(id);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://${process.env.REACT_APP_SERVER}/user/getUser/${id.userId}`
      );
      console.log(res);
      setUser(res.data.user);
    };
    const fetchUserPosts = async () => {
      const res = await axios.get(
        `https://${process.env.REACT_APP_SERVER}/post/user/${id.userId}`
      );
      console.log(res);
      res.data.sort((a, b) => {
        const d1 = new Date(a.createdAt);
        const d2 = new Date(b.createdAt);
        if (d1.getTime() > d2.getTime()) return -1;
        else if (d1.getTime() < d2.getTime()) return 1;
        else return 0;
      });
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
      <UserInfo user={user} posts={posts} />
      {loading ? (
        <Loader />
      ) : (
        <div className="col-12 col-md-8 col-lg-6 mt-5 mx-auto">
          {posts.length > 0 ? (
            posts.map((post, key) => (
              <div className="my-3" key={key}>
                <Post
                  user={post.user}
                  likes={post.likes}
                  caption={post.caption}
                  image={post.image}
                  timestamp={post.createdAt}
                  _id={post._id}
                />
              </div>
            ))
          ) : (
            <div className="col-12 mx-auto text-light text-center">
              <h3>No posts to show!</h3>
            </div>
          )}
        </div>
      )}
    </>
  );
}
