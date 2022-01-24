import React, { useState, useContext } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { BsPersonCheckFill } from "react-icons/bs";
import { AuthContext } from "../../App";
import { isFriend, addFriend } from "../../lib/friendFunctions";

export default function PersonContainer({ res }) {
  const [friendState, setfriendState] = useState(false);
  const { state, dispatch } = useContext(AuthContext);
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
      {isFriend(res, state) || friendState ? (
        <BsPersonCheckFill
          className="my-auto ms-auto me-1"
          style={{ transform: "scale(1.5)" }}
        />
      ) : (
        <IoMdPersonAdd
          className="my-auto ms-auto me-2"
          style={{ transform: "scale(1.5)", cursor: "pointer" }}
          onClick={() => addFriend(res._id, state, setfriendState, dispatch)}
        />
      )}
    </div>
  );
}
