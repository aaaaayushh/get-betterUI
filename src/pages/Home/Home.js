import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../App";
import CreatePost from "../../components/createPost/CreatePost.jsx";
import FindFriends from "../../components/findFriends/FindFriends";
import Loader from "../../components/Loader/Loader";
import Post from "../../components/Post/Post";
import { AuthContext } from "../../App";
import ChatSection from "../../components/chatSection/index.js";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state } = useContext(AuthContext);
  useEffect(() => {
    setLoading(true);
    // console.log(state);
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `web-production-31a2.up.railway.app/post/${
            JSON.parse(state.user)._id
          }`
        );
        // console.log(res);

        // res.data.map((d) => {
        //   console.log(new Date(d.createdAt).getTime());
        // });
        res.data.sort((a, b) => {
          const d1 = new Date(a.createdAt);
          const d2 = new Date(b.createdAt);
          if (d1.getTime() > d2.getTime()) return -1;
          else if (d1.getTime() < d2.getTime()) return 1;
          else return 0;
        });
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="col-12 d-flex flex-column d-lg-none">
        <div>
          <CreatePost />
        </div>
        <div className="d-flex flex-row">
          {loading && (
            <div className="col-12 text-center my-auto">
              <Loader />
            </div>
          )}
          {posts ? (
            <div className="col-12 mx-auto">
              {posts.map((post, key) => (
                <div className="my-3" key={key}>
                  <Post
                    user={post.user}
                    likes={post.likes}
                    caption={post.caption}
                    image={post.image}
                    _id={post._id}
                    timestamp={post.createdAt}
                  />
                </div>
              ))}
            </div>
          ) : (
            <span className="fs-3 mx-auto mt-5">
              Add friends to see their posts!
            </span>
          )}
        </div>
      </div>
      <div className="col-12 d-none d-lg-flex">
        <div className="col-2 border-end border-3 d-flex flex-column">
          <div style={{ position: "sticky", top: "0" }}>
            <FindFriends />
            <ChatSection user={JSON.parse(state.user)} />
          </div>
        </div>
        <div className="col-10 justify-content-end">
          <div className="container">
            <CreatePost />
          </div>
          <div className="d-flex flex-row">
            {loading && (
              <div className="col-12 text-center my-auto">
                <Loader />
              </div>
            )}
            {posts ? (
              <div className="col-6 mx-auto">
                {posts.map((post, key) => (
                  <div className="my-3" key={key}>
                    <Post
                      user={post.user}
                      likes={post.likes}
                      caption={post.caption}
                      image={post.image}
                      _id={post._id}
                      timestamp={post.createdAt}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <span className="fs-3 mx-auto mt-5">
                Add friends to see their posts!
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
