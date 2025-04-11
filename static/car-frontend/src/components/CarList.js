import { useEffect, useState } from "react";
import api from "../api";

export default function CarList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    api.get("/cars/").then((res) => {
      setCars(res.data);
    });
  }, []);

  return (
    <div>
      <h2>All Cars</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>{car.make} {car.model} - {car.price}$ - {car.location}</li>
        ))}
      </ul>
    </div>
  );
}
