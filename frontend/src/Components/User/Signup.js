import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSignUp } from "../../Store/User/user-action";
import { toast } from "react-toastify";
import { userActions } from "../../Store/User/user-slice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, errors } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
  });

  const { password, passwordConfirm } = user;

  //handle input change, update user information
  const onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(getSignUp(user));
  };

  useEffect(() => {
    if (errors && errors.length > 0) {
      toast.error(errors);
      dispatch(userActions.clearError());
    } else if (isAuthenticated) {
      navigate("/");
      toast.success("User logged in successfully!!");
    }
  }, [dispatch, isAuthenticated, navigate, errors]);

  return (
    <>
      <div className="row wrapper">
        <form
          onSubmit={submitHandler}
          encType="multipart/form-data"
          className="col-10 col-lg-5"
        >
          <h1 className="mb-3">Register</h1>
          {["name", "email", "password", "passwordConfirm", "phoneNumber"].map(
            (field) => (
              <div className="form-group" key={field}>
                <label htmlFor={`${field}_field`}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field.includes("password") ? "password" : "text"}
                  id={`${field}_field`}
                  className="form-control"
                  name={field}
                  value={user[field]}
                  onChange={onchange}
                />
              </div>
            )
          )}

          <button
            id="register_button"
            type="submit"
            className="loginbutton btn-block py-3"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
