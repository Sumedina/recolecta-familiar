import { useState } from "react";

export default function DonationForm({ addDonation }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !amount || !date) return;

    addDonation({
      name,
      amount: Number(amount),
      date,
    });

    setName("");
    setAmount("");
    setDate("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Monto (C$)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button type="submit">Agregar aporte ❤️</button>
    </form>
  );
}