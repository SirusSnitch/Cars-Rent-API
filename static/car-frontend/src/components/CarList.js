import { useEffect, useState } from "react";
import api from "../api";

export default function CarList({ refresh }) {
  const [cars, setCars] = useState([]);

  const fetchCars = () => {
    api.get("/cars/").then((res) => {
      setCars(res.data);
    });
  };

  useEffect(() => {
    fetchCars();
  }, [refresh]);

  return (
    <div>
      <h2>All Cars</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.make} {car.model} - ${car.price} - {car.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
