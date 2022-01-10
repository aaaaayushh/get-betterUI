import axios from "axios";
import React, { useState, useContext } from "react";
import { FcSearch } from "react-icons/fc";
import { Button, Input, InputGroup } from "reactstrap";
import { AuthContext } from "../../App";

import PersonContainer from "./PersonContainer";

export default function FindFriends() {
  const [searchVal, setsearchVal] = useState("");
  const [searchRes, setSearchRes] = useState();
  const { state } = useContext(AuthContext);

  const searchUser = async (name) => {
    if (name !== "") {
      try {
        const res = await axios.get(
          `http://localhost:3001/user/search/${
            JSON.parse(state.user)._id
          }/${name}`
        );
        console.log(res);
        setSearchRes(res.data.users);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="container mt-3">
        <div className="mb-5">
          <InputGroup>
            <Input
              className="rounded border-3"
              placeholder="Search for people..."
              value={searchVal}
              onChange={(e) => {
                setsearchVal(e.target.value);
                searchUser(e.target.value);
              }}
            />
            <Button color="light">
              <FcSearch style={{ transform: "scale(2)" }} />
            </Button>
          </InputGroup>
        </div>
        {searchRes && (
          <div className="border border-3 p-3">
            {searchRes.map((res) => (
              <PersonContainer res={res} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
