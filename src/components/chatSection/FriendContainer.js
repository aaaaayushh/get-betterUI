import React, { useState } from "react";
import styles from "./FriendContainer.module.css";

export default function FriendContainer({ friend }) {
  const [openChat, setOpenChat] = useState(false);
  return (
    <>
      <div
        className={`d-flex p-3 flex-row ${styles.friendbox}`}
        style={{ cursor: "pointer" }}
        onClick={() => setOpenChat(!openChat)}
      >
        <div className="col-3">
          <img
            src={friend.profilePic ? friend.profilePic : "/anonymous-user.jpg"}
            alt=""
            className="img-fluid col-12 rounded-circle"
          />
        </div>
        <div className="col-9 ps-4 my-auto">
          <span className="fs-5">
            {friend.firstname} {friend.lastname}
          </span>
        </div>
      </div>
    </>
  );
}
