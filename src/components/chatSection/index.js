import React, { useState, useEffect } from "react";
import axios from "axios";
import FriendContainer from "./FriendContainer.jsx";

export default function ChatSection({ user }) {
  // console.log(user);
  const [friends, setFriends] = useState([]);
  async function getFriends(id) {
    const res = await axios.get(`http://localhost:3001/user/getFriends/${id}`);
    console.log(res);
    setFriends(res.data);
  }
  useEffect(() => {
    getFriends(user._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="container mt-2">
        <h3>Your friends</h3>
        <div className="d-flex flex-column">
          {friends.map((friend, key) => (
            <FriendContainer friend={friend} key={key} />
          ))}
        </div>
      </div>
    </>
  );
}
