import { useEffect, useState } from "react";
import api from "../api";

export default function RentalList({ refresh }) {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    api.get("/rentals/").then((res) => setRentals(res.data));
  }, [refresh]);

  return (
    <div>
      <h2>All Rentals</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Car</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((r) => (
            <tr key={r.rental_id}>
              <td>{r.user}</td>
              <td>{r.car}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
