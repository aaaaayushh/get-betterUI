import axios from "axios";

import { SuccessToast, ErrorToast } from "./toast";

export const isFriend = (user, state) => {
  var flag = 1;
  user.friends.forEach((friend) => {
    if (friend._id === JSON.parse(state.user)._id) {
      flag = 0;
    }
  });
  if (flag) {
    return false;
  } else {
    return true;
  }
};
export const addFriend = async (id, state, setfriendState, dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER}/user/addFriend/${id}`,
      {
        userid: JSON.parse(state.user)._id,
      }
    );
    console.log(res);
    if (res.status === 200) {
      if (setfriendState) {
        setfriendState(true);
      }
      const newUser = JSON.parse(state.user);
      newUser.friends.push(id);
      console.log(newUser);
      dispatch({ type: "ADDFRIEND", payload: { user: newUser } });
      SuccessToast("Friend added!");
    }
  } catch (err) {
    console.log(err);
    ErrorToast("An unexpected error occured");
  }
};
