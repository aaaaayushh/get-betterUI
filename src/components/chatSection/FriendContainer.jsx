import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../App";
import { Button, Form, Input } from "reactstrap";
import axios from "axios";
import useChat from "../../hooks/useChat";
import styles from "./FriendContainer.module.css";

export function ChatWindow({ friend, userId }) {
  const { messages, sendMessage } = useChat(friend._id, userId);
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
  return (
    <div className={`container`}>
      <span className="fs-6">{friend.firstname}</span>
      <div className="d-flex flex-column col-12">
        <ol style={{ listStyleType: "none" }}>
          {messages.map((msg, index) => (
            <li
              key={index}
              className={`col-6 ${
                msg.ownedByCurrentUser
                  ? "text-end p-2 bg-success mb-3"
                  : "bg-primary text-light p-2 ms-auto mb-3"
              }`}
            >
              {msg.body}
            </li>
          ))}
        </ol>
      </div>
      <Form>
        <Input
          type="textarea"
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
        <div className="col-9 ps-4 my-auto">
          <span className="fs-5">
            {friend.firstname} {friend.lastname}
          </span>
        </div>
      </div>
      {openChat && (
        <ChatWindow friend={friend} userId={JSON.parse(state.user)._id} />
      )}
    </>
  );
}
