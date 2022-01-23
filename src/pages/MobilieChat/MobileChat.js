import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../App";
import ChatSection from "../../components/chatSection";
export default function MobileChat() {
  const { state } = useContext(AuthContext);
  return (
    <div className="col-12">
      <ChatSection user={JSON.parse(state.user)} />
    </div>
  );
}
