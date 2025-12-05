import { validatePayment } from "../api/paiements";

export default function PaiementPage() {
  const handlePayment = () => {
    validatePayment(12, 1500, "Carte").then((res) => {
      alert(res.data.message);
    });
  };

  return (
    <div>
      <h1>Payment</h1>
      <button onClick={handlePayment}>Validate Payment</button>
    </div>
  );
}
