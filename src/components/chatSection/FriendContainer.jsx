import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../App";
import { Button, Form, Input } from "reactstrap";
import { AiFillMessage } from "react-icons/ai";
import axios from "axios";
import useChat from "../../hooks/useChat";
import styles from "./FriendContainer.module.css";
import Loader from "../Loader/Loader";

export function ChatWindow({ friend, userId }) {
  const [loading, setLoading] = useState(false);
  const { messages, sendMessage } = useChat(friend._id, userId, setLoading);
  const [newMessage, setNewMessage] = useState("");
  const handleSendMessage = async () => {
    sendMessage(newMessage);
    const message = {
      sender: userId,
      receiver: friend._id,
      message: newMessage,
    };
    const res = await axios.post(
      "http://localhost:3001/message/createMessage",
      message
    );
    console.log(res);
    messages.push({ body: newMessage, ownedByCurrentUser: true });
    setNewMessage("");
  };
  if (loading) {
    return (
      <div className="col-12 text-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="container">
      <div
        className="d-flex flex-column-reverse col-12"
        style={{ overflowY: "scroll", height: "30vh" }}
      >
        <ol style={{ listStyleType: "none" }}>
          {messages.map((msg, index) => (
            <li
              key={index}
              className={`col-8 ${
                msg.ownedByCurrentUser
                  ? "bg-primary text-light p-2 ms-auto mb-3"
                  : "text-end p-2 bg-success text-light mb-3"
              }`}
            >
              {msg.body}
            </li>
          ))}
        </ol>
      </div>
      <Form className="mt-3 d-flex flex-row">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          required
          placeholder="Write message..."
        />
        <Button onClick={handleSendMessage} color="primary">
          Send
        </Button>
      </Form>
    </div>
  );
}

export default function FriendContainer({ friend }) {
  const [openChat, setOpenChat] = useState(false);
  const { state } = useContext(AuthContext);
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
        <div className="col-9 ps-4 my-auto d-flex flex-row justify-content-between">
          <span className="fs-5">
            {friend.firstname} {friend.lastname}
          </span>
          <div className="my-auto">
            <AiFillMessage
              className="text-primary"
              style={{ transform: "scale(1.5)" }}
            />
          </div>
        </div>
      </div>
      {openChat && (
        <ChatWindow friend={friend} userId={JSON.parse(state.user)._id} />
      )}
    </>
  );
}
