import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { BiComment } from "react-icons/bi";
export default function Post() {
  return (
    <>
      <div className="card col-12">
        <div className="d-flex border-bottom">
          <div className="rounded-circle mt-1">
            <img
              src="https://images.indianexpress.com/2021/01/myntra.png"
              alt=""
              className="img-fluid"
              style={{ width: "5em" }}
            />
          </div>
          <div className="fs-5 mt-2">Aayush Shah</div>
        </div>
        <img
          src="https://images.indianexpress.com/2021/01/myntra.png"
          alt=""
          className="img-fluid col-12"
        />
        <hr />
        <div className="ms-3 mb-3">
          <AiOutlineHeart className="me-2" />
          <FcLike className="me-2" />
          <BiComment className="me-2" />
        </div>
        {/* post caption */}
        <div className="mx-3">
          <div className="fs-5">
            <strong>Aayush Shah </strong>
            This is a post description.
          </div>
        </div>
        {/* comments */}
        <div className="mx-3">
          <div className="fs-6">
            <strong>Aayush Shah </strong>
            This is a post comment.
          </div>
          <div className="fs-6">
            <strong>Aayush Shah </strong>
            This is a post comment.
          </div>
          <div className="fs-6">
            <strong>Aayush Shah </strong>
            This is a post comment.
          </div>
        </div>
      </div>
    </>
  );
}
