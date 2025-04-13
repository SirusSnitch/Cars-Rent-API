import { useState } from "react";
import "./App.css";
import CarList from "./components/CarList";
import AddCar from "./components/AddCar";
import AddUser from "./components/AddUser";
import RentCar from "./components/RentCar";
import UserList from "./components/UserList";
import RentalList from "./components/RentalList";

function App() {
  const [refresh, setRefresh] = useState(0);
  const [section, setSection] = useState("cars"); // default is 'cars'

  const triggerRefresh = () => setRefresh((r) => r + 1);

  return (
    <div>
      <nav>
        <ul>
          <li onClick={() => setSection("cars")}>Cars</li>
          <li onClick={() => setSection("users")}>Users</li>
          <li onClick={() => setSection("rentals")}>Rent</li>
        </ul>
      </nav>

      <div style={{ padding: "20px" }}>
        <h1>🚗 Car Management</h1>

        {section === "cars" && (
          <>
            <AddCar onAdd={triggerRefresh} />
            <CarList refresh={refresh} />
          </>
        )}

        {section === "users" && (
          <>
            <AddUser onAdd={triggerRefresh} />
            <UserList refresh={refresh} />
          </>
        )}

        {section === "rentals" && (
          <>
            <RentCar onAdd={triggerRefresh} />
            <RentalList refresh={refresh} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
