import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNonAuthCheck } from "../hooks/auth";

export default function Main() {
  const nonAuthCheck = useNonAuthCheck("/login");
  const [account, setAccount] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passColor, setPassColor] = useState("red");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailColor, setEmailColor] = useState("green");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");

  // eslint-disable-next-line
  useEffect(nonAuthCheck, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/account", { withCredentials: true })
      .then((res) => {
        setAccount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (account) {
      console.log("Account: " + JSON.stringify(account));
      setUsername(account.username);
      setEmail(account.email);
      setFullname(account.fullname);
      setAddress(account.address);
      setContact(account.contact);
      setGender(account.gender);
    }
  }, [account]);
  console.log("username:" + username);
  console.log("password:" + password);
  console.log("email:" + email);
  console.log("fullname:" + fullname);
  console.log("address:" + address);
  console.log("contact:" + contact);
  console.log("gender:" + gender);

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
    if (e.target.value === account.email) return setEmailColor("green");
    axios
      .get(`http://localhost:3001/api/account/validate/email/${e.target.value}`)
      .then((res) => {
        setEmailColor(res.data ? "green" : "red");
      })
      .catch((err) => {
        console.log("Something Went Wrong, Cause", err);
      });
  }

  function update(e) {
    e.preventDefault();
    axios
      .patch(
        `http://localhost:3001/api/account/${account._id}`,
        {
          password: password ? password : null,
          email: email,
          fullname: fullname,
          address: address,
          contact: contact,
          gender: gender,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("Updated!");
        // navigate("/login");
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }

  function logout() {
    if (window.confirm("Are you sure you want to logout?"))
      axios
        .get("http://localhost:3001/api/account/logout", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.message) {
            nonAuthCheck();
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }

  return (
    <div>
      <h1>Main Page</h1>
      <input type="button" value="Logout" onClick={logout} />
      <br />
      <br />

      <form onSubmit={update}>
        <span>{username}</span>
        <br />
        <input
          style={{ color: passColor }}
          type={showPassword ? "text" : "password"}
          onChange={passwordChange}
          value={password}
          placeholder="Password"
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
        <input type="submit" value="Update" />
      </form>
    </div>
  );
}
