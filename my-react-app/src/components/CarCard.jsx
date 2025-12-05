export default function CarCard({ car, onRent }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "16px",
      borderRadius: "8px",
      marginBottom: "12px",
      width: "300px"
    }}>
      <h3>{car.marque} {car.modele}</h3>
      <p><strong>Matricule:</strong> {car.matricule}</p>
      <p><strong>État:</strong> {car.etat}</p>
      <p><strong>Kilométrage:</strong> {car.kilometrage}</p>
      <p><strong>Prix/jour:</strong> {car.prix_journalier} MAD</p>

      <button onClick={() => onRent(car)}>
        Rent this car
      </button>
    </div>
  );
}
