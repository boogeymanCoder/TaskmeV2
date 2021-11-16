import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthCheck } from "../hooks/auth";
import { useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [usrColor, setUsrColor] = useState("red");
  const [password, setPassword] = useState("");
  const [passColor, setPassColor] = useState("red");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailColor, setEmailColor] = useState("red");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");

  function usernameChange(e) {
    setUsername(e.target.value);
    if (e.target.value === "") return;
    axios
      .get(
        `http://localhost:3001/api/account/validate/username/${e.target.value}`
      )
      .then((res) => {
        setUsrColor(res.data ? "green" : "red");
      })
      .catch((err) => {
        console.log("Something Went Wrong, Cause", err);
      });
  }

  function passwordChange(e) {
    setPassword(e.target.value);
    if (
      /[0-9]+/.test(e.target.value) &&
      /[a-z]+/.test(e.target.value) &&
      /[A-Z]+/.test(e.target.value) &&
      /[^0-9a-zA-Z]+/.test(e.target.value)
    ) {
      if (/.{8,}/.test(e.target.value)) {
        setPassColor("green");
      } else if (/.{6,}/.test(e.target.value)) {
        setPassColor("orange");
      }
    } else {
      setPassColor("red");
    }
  }

  function emailChange(e) {
    setEmail(e.target.value);
    if (e.target.value === "") return;
    axios
      .get(`http://localhost:3001/api/account/validate/email/${e.target.value}`)
      .then((res) => {
        setEmailColor(res.data ? "green" : "red");
      })
      .catch((err) => {
        console.log("Something Went Wrong, Cause", err);
      });
  }

  function register(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/account", {
        username: username,
        password: password,
        email: email,
        fullname: fullname,
        address: address,
        contact: contact,
        gender: gender,
      })
      .then((res) => {
        console.log("Registered!");
        navigate("/login");
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }

  // eslint-disable-next-line
  useEffect(useAuthCheck("/"), []);

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={register}>
        <input
          style={{ color: usrColor }}
          type="text"
          onChange={usernameChange}
          value={username}
          placeholder="Username"
          required
        />
        <br />
        <input
          style={{ color: passColor }}
          type={showPassword ? "text" : "password"}
          onChange={passwordChange}
          value={password}
          placeholder="New Password"
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
        <input
          style={{ color: emailColor }}
          type="email"
          onChange={emailChange}
          value={email}
          placeholder="Email"
          required
        />
        <br />
        <input
          type="text"
          onChange={(e) => setFullname(e.target.value)}
          value={fullname}
          placeholder="Fullname"
          required
        />
        <br />
        <input
          type="text"
          name="address"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          placeholder="Address"
          required
        />
        <br />
        <input
          type="tel"
          onChange={(e) => setContact(e.target.value)}
          value={contact}
          placeholder="Contact Number"
          required
        />
        <br />
        <select
          onChange={(e) => setGender(e.target.value)}
          value={gender}
          required
        >
          <option value="" defaultValue hidden>
            Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <br />
        <input type="submit" value="Register" />
      </form>
    </>
  );
}
