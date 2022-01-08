import axios from "axios";
import React, { useEffect, useState } from "react";
// import { AuthContext } from "../../App";
import CreatePost from "../../components/createPost/CreatePost";
import FindFriends from "../../components/findFriends/FindFriends";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { state } = useContext(AuthContext);
  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/post");
        console.log(res);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
    setLoading(false);
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="col-12 d-flex">
        <div className="col-2 border-end border-3">
          <FindFriends />
        </div>
        <div className="col-10 justify-content-end">
          <div className="container">
            <CreatePost />
          </div>
          <div className="d-flex flex-row">
            <div className="col-6 mx-auto">
              {posts &&
                posts.map((post, key) => (
                  <div className="my-3">
                    <Post
                      key={key}
                      user={post.user}
                      likes={post.likes}
                      caption={post.caption}
                      image={post.image}
                      _id={post._id}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
