import axios from "axios";
import React, { useEffect, useState } from "react";
// import { AuthContext } from "../../App";
import CreatePost from "../../components/createPost/CreatePost";
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
        // console.log(res);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);
  return (
    <>
      <div className="container">
        <CreatePost />
        <div className="col-8 mx-auto">
          {posts &&
            posts.map((post, key) => (
              <div className="my-3">
                <Post
                  key={key}
                  user={post.user}
                  likes={post.likes}
                  caption={post.caption}
                  image={post.image}
                  comments={post.comments}
                  _id={post._id}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
