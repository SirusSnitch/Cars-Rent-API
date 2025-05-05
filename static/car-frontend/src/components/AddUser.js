import { useState } from "react";
import api from "../api";

export default function AddUser({ onAdd }) {
  const [user, setUser] = useState({ name: "", surname: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/users/", user)
      .then(() => {
        alert("User created!");
        onAdd(); // trigger refresh
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="User Name"
        onChange={handleChange}
        value={user.name}
      />
      <input
        name="surname"
        placeholder="Surname"
        onChange={handleChange}
        value={user.surname}
      />
      <button type="submit">Add User</button>
    </form>
  );
}
