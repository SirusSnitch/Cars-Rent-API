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
      <ul>
        {rentals.map((r) => (
          <li key={r.rental_id}>
            {r.user} rented {r.car}
          </li>
        ))}
      </ul>
    </div>
  );
}
