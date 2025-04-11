import { useState } from "react";
import api from "../api";

export default function AddUser() {
  const [user, setUser] = useState({ name: "", is_admin: false });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setUser({ ...user, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("http://localhost:8002/users/", user).then(() => {
      alert("User Created");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="User Name" onChange={handleChange} />
      <label>
        <input type="checkbox" name="is_admin" onChange={handleChange} />
        Admin
      </label>
      <button type="submit">Add User</button>
    </form>
  );
}
