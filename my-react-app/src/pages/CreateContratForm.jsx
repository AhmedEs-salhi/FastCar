import { useState } from "react";
import { createContrat } from "../api/contract";

export default function CreateContratForm({ selectedCar }) {
  const [form, setForm] = useState({
    // Client info
    cin_client: "",
    nom_client: "",
    prenom_client: "",
    telephone_client: "",
    ville_client: "",

    // Vehicle info
    id_vehicule: selectedCar?.matricule || "",

    // Dates
    date_debut: "",
    date_fin: "",

    // Payment
    mode_paiement: "",

    // Agent
    id_agent: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createContrat(form)
      .then(() => {
        alert("Contract created successfully");
      })
      .catch((err) => {
        console.error(err.response?.data);
        alert("Error creating contract — check required fields");
      });
  };

  if (!selectedCar) {
    return <p>Select a car first.</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "350px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "20px",
      }}
    >
      <h2>Rent Car: {selectedCar.marque} {selectedCar.modele}</h2>

      {/* CLIENT INFO */}
      <input name="cin_client" placeholder="CIN Client" onChange={handleChange} required />
      <input name="nom_client" placeholder="Nom Client" onChange={handleChange} required />
      <input name="prenom_client" placeholder="Prénom Client" onChange={handleChange} required />
      <input name="telephone_client" placeholder="Téléphone Client" onChange={handleChange} required />
      <input name="ville_client" placeholder="Ville Client (ID)" onChange={handleChange} required />

      {/* DATES */}
      <label>Date début</label>
      <input type="date" name="date_debut" onChange={handleChange} required />

      <label>Date fin</label>
      <input type="date" name="date_fin" onChange={handleChange} required />

      {/* PAYMENT */}
      <select name="mode_paiement" onChange={handleChange} required>
        <option value="">Mode de paiement</option>
        <option value="carte">Carte</option>
        <option value="espece">Espèce</option>
        <option value="virement">Virement</option>
      </select>

      {/* AGENT */}
      <input name="id_agent" placeholder="ID Agent" onChange={handleChange} required />

      <button type="submit">Create Contract</button>
    </form>
  );
}
