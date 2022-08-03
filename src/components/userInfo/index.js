import axios from "axios";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { AuthContext } from "../../App";
import { addFriend, isFriend } from "../../lib/friendFunctions";
import styles from "./useInfo.module.css";

export default function UserInfo({ user, posts }) {
  const [profilePic, setProfilePic] = useState();
  const [, setFileError] = useState(false);
  const [filePreview, setFilePreview] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const { state, dispatch } = useContext(AuthContext);
  const [owner] = useState(
    state.user ? JSON.parse(state.user)._id === user._id : false
  );
  const [showFollow, setShowFollow] = useState(
    !owner && !isFriend(user, state)
  );
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
        `https://${process.env.REACT_APP_SERVER}/post/uploadImage`,
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
      const res = await axios.post(
        `https://${process.env.REACT_APP_SERVER}/user/updateDp`,
        {
          id: user._id,
          picUrl: picUrl,
        }
      );
      console.log(res);
      setIsOpen(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="card col-8 mx-auto shadow-lg d-none d-lg-flex flex-row p-3 bg-dark mt-3 rounded">
        <div className="col-2 col-md-1 m-3">
          <div className={`${styles.picContainer}`}>
            {owner ? (
              <>
                <img
                  src={
                    user.profilePic ? user.profilePic : "/anonymous-user.jpg"
                  }
                  className={`img-fluid rounded-circle col-12 ${styles.profilePic}`}
                  alt="profilepic"
                  onClick={handleClick}
                />
                <BsUpload className={`${styles.uploadIcon}`} />
              </>
            ) : (
              <>
                <img
                  src={
                    user.profilePic ? user.profilePic : "/anonymous-user.jpg"
                  }
                  className={`img-fluid rounded-circle col-12 `}
                  alt="profilepic"
                />
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            className="d-none"
            onChange={handleChange}
            ref={hiddenFileInput}
          />
        </div>
        <div className="col-8 my-auto ms-3 mt-3 ">
          <div className="d-flex col-12 justify-content-between">
            <div>
              <span className="fs-3 fw-bold">
                {user.firstname} {user.lastname}
              </span>
              <br />
              <small className="fw-bolder ms-1">{user.username}</small>
              <br />
            </div>
            {showFollow && (
              <Button
                className="align-self-center col-2"
                color="light"
                onClick={() => {
                  addFriend(user._id, state, null, dispatch);
                  setShowFollow(false);
                }}
              >
                Follow
              </Button>
            )}
          </div>
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
      <div className="card col-12 mx-auto shadow-lg d-flex d-lg-none flex-column p-3 bg-dark mt-3 rounded">
        <div className="d-flex flex-row">
          <div className="col-2 m-3">
            <div
              className={`${styles.picContainer} d-flex flex-column align-items-end`}
            >
              <img
                src={user.profilePic ? user.profilePic : "/anonymous-user.jpg"}
                className={`img-fluid rounded-circle col-12 ${styles.profilePic}`}
                alt=""
              />
              {JSON.parse(state.user)._id === user._id && (
                <AiOutlineEdit
                  onClick={handleClick}
                  style={{ transform: "scale(1.4)" }}
                />
              )}
            </div>
            <input
              type="file"
              accept="image/jpg,image/png,image/jpeg"
              className="d-none"
              onChange={handleChange}
              ref={hiddenFileInput}
            />
          </div>
          <div className="col-8 my-auto ms-3 mt-3 ">
            <span className="fs-3 fw-bold">
              {user.firstname} {user.lastname}
            </span>
            <br />
            <small className="fw-bolder ms-1">{user.username}</small>
            <br />
            {showFollow && (
              <Button
                className="align-self-center col-6 mt-3"
                color="light"
                onClick={() => {
                  addFriend(user._id, state, null, dispatch);
                  setShowFollow(false);
                }}
              >
                Follow
              </Button>
            )}
          </div>
        </div>
        <hr />
        <div className="col-12 d-flex flex-row justify-content-evenly">
          <div className="d-flex flex-column col-3">
            <span className="col-12 text-center fw-bolder fs-4">
              {user.friends.length}
            </span>
            <span className="col-12 text-center fs-5">Friends</span>
          </div>
          <div className="d-flex flex-column col-3">
            <span className="col-12 text-center fw-bolder fs-4">
              {posts.length}
            </span>
            <span className="col-12 text-center fs-5">Posts</span>
          </div>
        </div>
      </div>
    </>
  );
}
