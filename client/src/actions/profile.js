import axios from "axios";
import { setAlert } from "./alert";
import { useNavigate } from "react-router-dom";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

// get current user profile

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// create or update a profile

export const createProfile =
  (formData, edit = false) =>
  async (dispatch) => {
    try {
      let navigate = useNavigate();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const res = await axios.post("/api/profile", formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert(edit ? "Profile updated" : "Profile Created"));
      if (!edit) {
        navigate("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
