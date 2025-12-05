import { useState } from "react";
import axiosClient from "../api/axiosClient";

export default function ConfirmContratForm() {
  const [idContrat, setIdContrat] = useState("");
  const [idAgent, setIdAgent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosClient.post(`/contrats/${idContrat}/confirm/`, {
      id_agent: idAgent
    }).then((res) => {
      alert(res.data.message);
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "300px" }}>
      <h2>Confirm Contract</h2>

      <input
        placeholder="Contract ID"
        value={idContrat}
        onChange={(e) => setIdContrat(e.target.value)}
      />

      <input
        placeholder="Agent ID"
        value={idAgent}
        onChange={(e) => setIdAgent(e.target.value)}
      />

      <button type="submit">Confirm</button>
    </form>
  );
}
