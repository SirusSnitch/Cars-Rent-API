import { useEffect, useState } from "react";
import api from "../api";

export default function UserList({ refresh, setActiveUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users/").then((res) => setUsers(res.data));
  }, [refresh]);

  return (
    <div>
      <h2>All Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.surname}</td>
              <td>
                <button onClick={() => setActiveUser(u)}>Login</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
