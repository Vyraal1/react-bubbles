import React, { useState } from "react";

const Login = () => {
  const initialState = { username: "", password: "" };
  const [credentials, setCredentials] = useState({ initialState });
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleSubmit = e => {
    console.log(e);
  };

  const handleChange = e => {
    console.log(e);
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
