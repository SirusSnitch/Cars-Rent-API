import { useState } from "react";
import api from "../api";

export default function AddCar() {
  const [car, setCar] = useState({
    make: "",
    model: "",
    price: "",
    location: ""
  });

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/cars/", { ...car, price: parseInt(car.price) }).then(() => {
      alert("Car Added");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="make" placeholder="Make" onChange={handleChange} />
      <input name="model" placeholder="Model" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <input name="location" placeholder="Location" onChange={handleChange} />
      <button type="submit">Add Car</button>
    </form>
  );
}
