import { useEffect, useState } from "react";
import { getAvailableVehicules } from "../api/vehicules";
import CarCard from "../components/CarCard";
import CreateContratForm from "./CreateContratForm";

export default function VehiculesPage() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    getAvailableVehicules().then((res) => {
      setCars(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Available Vehicles</h1>

      {cars.map((car) => (
        <CarCard
          key={car.matricule}
          car={car}
          onRent={(car) => setSelectedCar(car)}
        />
      ))}

      <hr />

      <CreateContratForm selectedCar={selectedCar} />
    </div>
  );
}
