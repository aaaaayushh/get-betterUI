import React, { useState, useContext } from "react";
import { useEffect } from "react";
import {
  Alert,
  Button,
  Input,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import axios from "axios";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { AuthContext } from "../../App";
import styles from "./createPost.module.css";

export default function CreatePost() {
  const [modalOpen, setModalOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  const [filePreview, setFilePreview] = useState();
  const [fileError, setFileError] = useState(false);
  const [loading, setLoading] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const { state } = useContext(AuthContext);

  // useEffect(() => {
  //   console.log(JSON.parse(state.user));
  // }, [state.user]);

  useEffect(() => {
    if (!fileUpload) {
      setFilePreview(undefined);
      return;
    }
    const objectURL = URL.createObjectURL(fileUpload);
    setFilePreview(objectURL);
    //free memory whenever this component is unmounted
    return () => URL.revokeObjectURL(objectURL);
  }, [fileUpload]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  function validImageFile(filename) {
    var idxdot = filename.lastIndexOf(".") + 1;
    var extFile = filename.substr(idxdot, filename.length).toLowerCase();
    console.log(extFile);
    if (extFile === "jpg" || extFile === "png" || extFile === "jpeg") {
      setFileError(false);
      return true;
    } else {
      setFileError(true);
      return false;
    }
  }
  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];
    console.log(fileUploaded);
    if (validImageFile(fileUploaded.name)) {
      setFileUpload(fileUploaded);
    }
  };

  const uploadPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(state);

    var picUrl = "";
    if (fileUpload) {
      const formData = new FormData();
      formData.append("file", fileUpload);
      try {
        const res = await axios.post(
          "http://localhost:3001/post/uploadImage",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(res);
        picUrl = res.data.data;
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const post = { caption, image: picUrl, user: JSON.parse(state.user) };
      console.log(post);
      const res = await axios.post("http://localhost:3001/post", post);
      console.log(res);
      setLoading(false);
      setModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    console.log(hiddenFileInput);
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };
  return (
    <>
      <div className="card col-12 rounded-pill d-flex flex-row p-3 mt-3">
        <div className="col-1 me-3 my-auto">
          {JSON.parse(state.user).imageUrl ||
          JSON.parse(state.user).profilePic ? (
            <img
              src={
                JSON.parse(state.user).imageUrl ||
                JSON.parse(state.user).profilePic
              }
              alt="profile pic"
              className="img-fluid rounded-circle col-10"
            />
          ) : (
            <img
              src="/anonymous-user.jpg"
              alt=""
              className="img-fluid col-10 rounded-circle"
            />
          )}
        </div>

        <div
          className={`flex-grow-1 me-2 my-auto rounded-pill flex-1 border-0 bg-secondary p-3 text-white ${styles.postBox}`}
          onClick={toggleModal}
          style={{ cursor: "pointer" }}
        >
          What's up with you,{" "}
          {JSON.parse(state.user).googleId
            ? JSON.parse(state.user).givenName
            : JSON.parse(state.user).firstname}
          ? Feel free to share your successes and your setbacks!
        </div>
      </div>
      <Modal isOpen={modalOpen} size="lg" centered toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Create a Post</ModalHeader>
        <ModalBody className="bg-secondary">
          <div>
            <Form>
              <Input
                type="text"
                required
                className={` bg-secondary rounded-pill border-2 text-light fw-bold ${styles.modalInput}`}
                placeholder="What's on your mind?"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              {fileUpload ? (
                <div className="m-4">
                  <img src={filePreview} alt="preview" className="img-fluid" />
                  <div className="col-12 d-flex flex-row justify-content-between">
                    <Button
                      color="danger"
                      className="mt-3 rounded-pill"
                      onClick={() => {
                        setFileUpload(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    height: "50vh",
                    backgroundColor: "#565659",
                    cursor: "pointer",
                  }}
                  onClick={handleClick}
                  className="mt-3 card shadow shadow-lg border-0 text-light"
                >
                  <div className="mx-auto my-auto d-flex flex-column">
                    <MdOutlinePhotoLibrary
                      className="mx-auto"
                      style={{ transform: "scale(3)" }}
                    />
                    <span className="fs-6 mt-3">Upload a photo!</span>
                  </div>
                </div>
              )}
              <div className="col-12 d-flex justify-content-end">
                <Button
                  type="submit"
                  className="col-3 mt-3"
                  color="success rounded-pill "
                  disabled={caption === "" ? true : false}
                  onClick={(e) => uploadPost(e)}
                >
                  {loading ? (
                    <>
                      <span>Creating post...</span>
                      <span
                        className="spinner-border spinner-border-sm ms-3"
                        aria-hidden="true"
                      />
                    </>
                  ) : (
                    <span>Create Post</span>
                  )}
                </Button>
              </div>
              {fileError && (
                <Alert color="warning">
                  Please choose a valid image format!
                </Alert>
              )}
              <input
                type="file"
                accept="image/jpg,image/png,image/jpeg"
                ref={hiddenFileInput}
                onChange={handleChange}
                className="d-none"
              />
            </Form>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
