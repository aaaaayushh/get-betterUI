import axios from "axios";
import React, { useState, useEffect } from "react";
import { BsUpload } from "react-icons/bs";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import styles from "./useInfo.module.css";

export default function UserInfo({ user, posts }) {
  const [profilePic, setProfilePic] = useState();
  const [fileError, setFileError] = useState(false);
  const [filePreview, setFilePreview] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const hiddenFileInput = React.useRef(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
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
  useEffect(() => {
    if (!profilePic) {
      setFilePreview(undefined);
      return;
    }
    const objectURL = URL.createObjectURL(profilePic);
    setFilePreview(objectURL);
    //free memory whenever this component is unmounted
    return () => URL.revokeObjectURL(objectURL);
  }, [profilePic]);
  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];
    if (validImageFile(fileUploaded.name)) {
      setProfilePic(fileUploaded);
      setIsOpen(true);
    }
  };
  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };
  const cancelUpload = () => {
    setProfilePic(null);
    setIsOpen(false);
  };
  const uploadProfilePic = async (e) => {
    e.preventDefault();

    var picUrl = "";
    const formData = new FormData();
    formData.append("file", profilePic);
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
    try {
      const res = await axios.post("http://localhost:3001/user/updateDp", {
        id: user._id,
        picUrl: picUrl,
      });
      console.log(res);
      setIsOpen(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card col-8 mx-auto shadow-lg d-flex flex-row p-3">
      <div className="col-1 m-3">
        {user.profilePic ? (
          <div className={`${styles.picContainer}`}>
            <img
              src={user.profilePic}
              className={`img-fluid rounded-circle col-12 ${styles.profilePic}`}
              alt=""
              onClick={handleClick}
            />
            <BsUpload className={`${styles.uploadIcon}`} />
          </div>
        ) : (
          <div className={`${styles.picContainer}`}>
            <img
              src="/anonymous-user.jpg"
              className={`img-fluid rounded-circle col-12 ${styles.profilePic}`}
              alt=""
              onClick={handleClick}
            />
            <BsUpload className={`${styles.uploadIcon}`} />
          </div>
        )}
        <input
          type="file"
          accept="image/jpg,image/png,image/jpeg"
          className="d-none"
          onChange={handleChange}
          ref={hiddenFileInput}
        />
      </div>
      <div className="col-8 my-auto ms-3 mt-3">
        <span className="fs-3 fw-bold">
          {user.firstname} {user.lastname}
        </span>
        <br />
        <small className="fw-bolder ms-1">{user.username}</small>
        <br />
        <hr />
        <div className="col-12 d-flex flex-row justify-content-center">
          <div className="d-flex flex-column col-2 mx-5">
            <span className="col-12 text-center fw-bolder ms-1 fs-4">
              {user.friends.length}
            </span>
            <span className="col-12 text-center fs-5">Friends</span>
          </div>
          <div className="d-flex flex-column col-2">
            <span className="col-12 text-center fw-bolder ms-1 fs-4">
              {posts.length}
            </span>
            <span className="col-12 text-center fs-5">Posts</span>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} size="lg" centered toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Update your profile picture
        </ModalHeader>
        <ModalBody>
          <div className="m-4">
            <img
              src={filePreview}
              alt=""
              className="img-fluid p-3 mx-auto col-12"
            />
            <div className="d-flex justify-content-between col-12">
              <Button color="danger" onClick={cancelUpload}>
                Cancel
              </Button>
              <Button color="primary" onClick={(e) => uploadProfilePic(e)}>
                Update
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
