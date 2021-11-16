import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthCheck } from "../hooks/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginAuthCheck = useAuthCheck("/", "/login");

  function login(e) {
    console.log("Username: " + username);
    console.log("Password: " + password);
    e.preventDefault();

    axios
      .post(
        "http://localhost:3001/api/account/login",
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.message) {
          return alert(res.data.message);
        }
        console.log("Received after login:", res);
        axios
          .get("http://localhost:3001/api/account", { withCredentials: true })
          .then((res) => {
            console.log(res);

            loginAuthCheck();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // // eslint-disable-next-line
  useEffect(loginAuthCheck, []);

  return (
    <form onSubmit={login}>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username/Email"
        required
      />
      <br />
      <input
        type={showPassword ? "text" : "password"}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <br />
      <input
        type="checkbox"
        onChange={(e) => setShowPassword(e.target.checked)}
        checked={showPassword}
      />
      <span>Show Password</span>
      <br />
      <input type="submit" value="Login" />
    </form>
  );
}
