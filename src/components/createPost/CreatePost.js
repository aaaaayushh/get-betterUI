import React, { useState, useContext } from "react";
import { useEffect } from "react";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { AuthContext } from "../../App";
import styles from "./createPost.module.css";

export default function CreatePost() {
  const [modalOpen, setModalOpen] = useState(false);
  const [fileUpload, setFileUpload] = useState(null);
  const hiddenFileInput = React.useRef(null);
  const { state } = useContext(AuthContext);
  useEffect(() => {
    console.log(modalOpen);
  }, [modalOpen]);

  const user = state.user;
  const toggleModal = () => {
    console.log("called");
    setModalOpen(!modalOpen);
  };
  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];
    console.log(fileUploaded);
    setFileUpload(fileUploaded);
  };
  const handleClick = () => {
    console.log(hiddenFileInput);
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };
  return (
    <>
      <div className="card col-12 rounded-pill d-flex flex-row p-3">
        <div className="col-1 me-3 my-auto">
          <img
            src="https://images.indianexpress.com/2021/01/myntra.png"
            alt="profile pic"
            className="img-fluid rounded-circle"
          />
        </div>
        <div
          className="flex-grow-1 me-2 my-auto rounded-pill flex-1 border-0 bg-secondary p-3 text-white"
          onClick={toggleModal}
          style={{ cursor: "pointer" }}
        >
          What's up with you, {user.givenName}? Feel free to share your
          successes and your setbacks!
        </div>
      </div>
      <Modal isOpen={modalOpen} size="lg" centered toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Create a Post</ModalHeader>
        <ModalBody className="bg-secondary">
          <div className="bg-secondary">
            <Input
              type="text"
              className={` bg-secondary rounded-pill border-2 ${styles.modalInput}`}
              placeholder="What's on your mind?"
            />
            <Button
              onClick={handleClick}
              className="mt-3 rounded-pill"
              color="primary"
            >
              Add a photo!
            </Button>
            <input
              type="file"
              accept="image/"
              ref={hiddenFileInput}
              onChange={handleChange}
              className="d-none"
            />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
