import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const Login = props => {
  const initialState = { username: "", password: "" };
  const [credentials, setCredentials] = useState(initialState);
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubble");
      })
      .catch(err => console.log(err));
  };

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <form onChange={handleChange} onSubmit={handleSubmit}>
      <input placeholder="Enter Username" name="username"></input>
      <input
        placeholder="Enter password"
        name="password"
        type="password"
      ></input>
      <button>Login</button>
    </form>
  );
};

export default Login;
