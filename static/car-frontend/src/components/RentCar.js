import { useState } from "react";
import api from "../api";

export default function RentCar({ onAdd }) {
  const [form, setForm] = useState({ user_id: "", car_id: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/rent/", null, { params: form })
      .then(() => {
        alert("Car rented successfully!");
        onAdd(); // Trigger refresh in RentalList
      })
      .catch((err) => {
        console.error(err);
        alert("Rental failed");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="user_id" placeholder="User ID" onChange={handleChange} />
      <input name="car_id" placeholder="Car ID" onChange={handleChange} />
      <button type="submit">Rent Car</button>
    </form>
  );
}
