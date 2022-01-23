import React, { useState, useContext } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { BsPersonCheckFill } from "react-icons/bs";
import axios from "axios";
import { AuthContext } from "../../App";
import { SuccessToast, ErrorToast } from "../../lib/toast";

export default function PersonContainer({ res }) {
  const [friendState, setfriendState] = useState(false);
  const { state } = useContext(AuthContext);
  const addFriend = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:3001/user/addFriend/${id}`,
        { userid: JSON.parse(state.user)._id }
      );
      console.log(res);
      if (res.status === 200) {
        setfriendState(true);
        SuccessToast("Friend added!");
      }
    } catch (err) {
      console.log(err);
      ErrorToast("An unexpected error occured");
    }
  };
  const isFriend = (user) => {
    if (user.friends.includes(JSON.parse(state.user)._id)) {
      return true;
    }
    return false;
  };
  return (
    <div className="d-flex mb-3 border border-2 p-2 ">
      <a
        href={`/profile/${res._id}`}
        className="text-decoration-none fw-bold text-white"
      >
        <img
          src={res.profilePic ? res.profilePic : "/anonymous-user.jpg"}
          alt=""
          className="col-2 rounded-circle"
        />
        <span className="flex-1 ms-3 my-auto" style={{ cursor: "pointer" }}>
          {res.firstname} {res.lastname}
        </span>
      </a>
      {isFriend(res) || friendState ? (
        <BsPersonCheckFill
          className="my-auto ms-auto me-1"
          style={{ transform: "scale(1.5)" }}
        />
      ) : (
        <IoMdPersonAdd
          className="my-auto ms-auto me-2"
          style={{ transform: "scale(1.5)", cursor: "pointer" }}
          onClick={() => addFriend(res._id)}
        />
      )}
    </div>
  );
}
