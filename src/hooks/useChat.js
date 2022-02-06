import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

const useChat = (chatId, userId, setLoading) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    async function getMessages() {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://${process.env.REACT_APP_SERVER}/message/getMessages/${userId}/${chatId}`
        );
        // console.log(res);
        //assign sender to each message
        res.data.msgs.forEach((msg) => {
          // msg = { ...msg, ownedByCurrentUser: msg.sender === userId };
          msg.ownedByCurrentUser = msg.sender === userId;
        });
        console.log(res.data.msgs);
        setMessages(res.data.msgs);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //create websocket connection

    socketRef.current = socketIOClient(
      `http://${process.env.REACT_APP_SERVER}`,
      {
        query: { chatId },
      }
    );
    console.log("connection created");
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (msg) => {
      const incomingMsg = {
        ...msg,
        ownedByCurrentUser: msg.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMsg]);
      console.log("message rcvd");
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [chatId]);

  const sendMessage = (msgBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, userId, {
      body: msgBody,
      senderId: socketRef.current.id,
    });
  };
  return { messages, sendMessage };
};
export default useChat;
