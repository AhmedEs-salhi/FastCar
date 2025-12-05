import { useState } from "react";
import { confirmContrat, calculateContrat } from "../api/contract";

export default function ContratDetails() {
  const [message, setMessage] = useState("");

  const handleConfirm = () => {
    confirmContrat(5, 3).then((res) => {
      setMessage(res.data.message);
    });
  };

  const handleCalculate = () => {
    calculateContrat(5).then((res) => {
      alert("Total: " + res.data.total);
    });
  };

  return (
    <div>
      <h1>Contract #5</h1>

      <button onClick={handleConfirm}>Confirm Contract</button>
      <button onClick={handleCalculate}>Calculate Price</button>

      <p>{message}</p>
    </div>
  );
}
