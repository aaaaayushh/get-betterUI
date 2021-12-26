import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { Input, Modal, ModalBody, ModalHeader } from "reactstrap";
import { AuthContext } from "../../App";
import styles from "./createPost.module.css";

export default function CreatePost() {
  const [modalOpen, setModalOpen] = useState(false);
  const { state } = useContext(AuthContext);
  useEffect(() => {
    console.log(modalOpen);
  }, [modalOpen]);

  const user = state.user;
  const toggleModal = () => {
    console.log("called");
    setModalOpen(!modalOpen);
  };
  return (
    <>
      <div className="card col-12 rounded-pill d-flex flex-row bg-secondary p-3">
        <div className="col-1 me-3">
          <img
            src="https://images.indianexpress.com/2021/01/myntra.png"
            alt="profile pic"
            className="img-fluid rounded-circle"
          />
        </div>
        <div className="flex-grow-1 me-2 my-auto">
          <Input
            size="lg"
            // disabled
            onClick={toggleModal}
            style={{ cursor: "pointer" }}
            className="rounded-pill flex-1 border-0"
            placeholder={`What's up with you, ${user.givenName}? Feel free to share your successes and your setbacks!`}
          />
        </div>
      </div>
      <Modal isOpen={modalOpen} size="lg" centered toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Create a Post</ModalHeader>
        <ModalBody className="bg-secondary">
          <div className="bg-secondary">
            <Input
              type="text"
              className={`border-0 bg-secondary ${styles.modalInput}`}
              placeholder="What's on your mind?"
            />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
