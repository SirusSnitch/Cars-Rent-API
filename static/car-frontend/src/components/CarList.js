import { useEffect, useState } from "react";
import api from "../api";

export default function CarList({ refresh, activeUser, onRent }) {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    api.get("/cars/").then((res) => setCars(res.data));
  }, [refresh]);

  return (
    <div>
      <h2>All Cars</h2>
      <table>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Price</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>${car.price}</td>
              <td>{car.location}</td>
              <td>
                {car.rented ? (
                  "Already Rented"
                ) : activeUser ? (
                  <button onClick={() => onRent(car.id)}>Rent</button>
                ) : (
                  "Available"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
