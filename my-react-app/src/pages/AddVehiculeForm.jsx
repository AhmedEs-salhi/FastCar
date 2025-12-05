import { useState } from "react";
import axiosClient from "../api/axiosClient";

export default function AddVehiculeForm() {
  const [form, setForm] = useState({
    matricule: "",
    marque: "",
    modele: "",
    etat: "Disponible",
    kilometrage: "",
    prix_journalier: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient.post("/vehicules/", form).then(() => {
      alert("Vehicle added successfully");
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "300px", display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2>Add Vehicle</h2>

      <input name="matricule" placeholder="Matricule" onChange={handleChange} />
      <input name="marque" placeholder="Marque" onChange={handleChange} />
      <input name="modele" placeholder="Modèle" onChange={handleChange} />
      <input name="kilometrage" placeholder="Kilométrage" onChange={handleChange} />

      <input
        name="prix_journalier"
        placeholder="Prix journalier (MAD)"
        type="number"
        onChange={handleChange}
      />

      <button type="submit">Add Vehicle</button>
    </form>
  );
}
