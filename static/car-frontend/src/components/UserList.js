import { useEffect, useState } from "react";
import api from "../api";

export default function UserList({ refresh }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users/").then((res) => setUsers(res.data));
  }, [refresh]);

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} {u.surname}
          </li>
        ))}
      </ul>
    </div>
  );
}
