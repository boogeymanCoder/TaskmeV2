import React from "react";
import axios from "axios";

function App() {
  const register = (e) => {
    console.log("Registering");
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={register()}>
        <input type="text" name="username" placeholder="Username" required />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <br />
        <input type="email" name="email" placeholder="Email" required />
        <br />
        <input type="text" name="fullname" placeholder="Fullname" required />
        <br />
        <input type="text" name="address" placeholder="Address" required />
        <br />
        <input
          type="tel"
          name="contact"
          placeholder="Contact Number"
          required
        />
        <br />
        <select name="gender" required>
          <option value="" defaultValue hidden>
            Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default App;
