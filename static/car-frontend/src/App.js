import { useState } from "react";
import "./App.css";
import CarList from "./components/CarList";
import AddCar from "./components/AddCar";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import RentalList from "./components/RentalList";
import api from "./api"; // ✅ required to make rent POST call

function App() {
  const [refresh, setRefresh] = useState(0);
  const [section, setSection] = useState("cars"); // default is 'cars'
  const [activeUser, setActiveUser] = useState(null); // ✅ current "logged in" user

  const triggerRefresh = () => setRefresh((r) => r + 1);

  const rentCar = (carId) => {
    if (!activeUser) return alert("No user logged in");
  
    api
      .post("/rent/", null, {
        params: {
          user_id: activeUser.id,
          car_id: carId,
        },
      })
      .then(() => {
        triggerRefresh();
        alert("Car rented!");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.detail); // shows "User has already rented this car"
        } else {
          alert("An error occurred while renting the car.");
        }
      });
  };
  

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
        {activeUser && (
          <p>
            Logged in as: <strong>{activeUser.name} {activeUser.surname}</strong>
          </p>
        )}

        {section === "cars" && (
          <>
            <AddCar onAdd={triggerRefresh} />
            <CarList refresh={refresh} activeUser={activeUser} onRent={rentCar} />
          </>
        )}

        {section === "users" && (
          <>
            <AddUser onAdd={triggerRefresh} />
            <UserList refresh={refresh} setActiveUser={setActiveUser} />
          </>
        )}

        {section === "rentals" && (
          <>
            <RentalList refresh={refresh} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
