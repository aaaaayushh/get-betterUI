import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const { state } = useContext(AuthContext);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const id = useParams("userId");
  console.log(id);
  const fetchUser = async (id) => {
    setLoading(true);
    const res = await axios.get(
      `http://localhost:3001/user/getUser/${id.userId}`
    );
    console.log(res);
    setUser(res.data.user);
    setLoading(false);
  };
  useEffect(() => {
    fetchUser(id);
  }, [id]);
  if (loading) {
    return <h1>loading</h1>;
  }
  return (
    <>
      <div className="card col-10 mx-auto shadow-lg d-flex flex-row">
        <div className="col-2 m-3">
          {user.profilePic ? (
            <img
              src={user.profilePic}
              className="img-fluid rounded-circle col-12"
              alt=""
            />
          ) : (
            <img
              src="/anonymous-user.jpg"
              className="rounded-circle img-fluid"
              alt=""
            />
          )}
        </div>
        <div className="col-8 mt-3 ms-3">
          <span className="fs-3 fw-bold">
            {user.firstname} {user.lastname}
          </span>
          <br />
          <small className="fw-bolder ms-1">{user.username}</small>
        </div>
      </div>
    </>
  );
}
