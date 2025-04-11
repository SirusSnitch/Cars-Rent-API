import CarList from "./components/CarList";
import AddCar from "./components/AddCar";
import AddUser from "./components/AddUser";
import RentCar from "./components/RentCar";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>🚗 Car Management System</h1>
      <AddCar />
      <hr />
      <CarList />
      <hr />
      <AddUser />
      <hr />
      <RentCar />
    </div>
  );
}

export default App;
