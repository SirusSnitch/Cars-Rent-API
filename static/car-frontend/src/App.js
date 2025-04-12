import { useState } from "react";
import CarList from "./components/CarList";
import AddCar from "./components/AddCar";
import AddUser from "./components/AddUser";
import RentCar from "./components/RentCar";
import UserList from "./components/UserList";
import RentalList from "./components/RentalList";

function App() {
  const [refresh, setRefresh] = useState(0);
  const triggerRefresh = () => setRefresh((r) => r + 1);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚗 Car Management</h1>

      <AddCar onAdd={triggerRefresh} />
      <CarList refresh={refresh} />

      <hr />
      <h2>👤 User Management</h2>
      <AddUser onAdd={triggerRefresh} />
      <UserList refresh={refresh} />

      <hr />
      <h2>🔁 Rentals</h2>
      <RentCar onAdd={triggerRefresh} />
      <RentalList refresh={refresh} />
    </div>
  );
}

export default App;
