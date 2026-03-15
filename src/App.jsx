import { useState, useEffect } from "react";
import ProgressBar from "./components/ProgressBar";
import DonationForm from "./components/DonationForm";
import DonationList from "./components/DonationList";
import { db, collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "./firebase";
import "./App.css";

const GOAL = 13700;

export default function App() {
  const [donations, setDonations] = useState([]);

  // Devuelve mes actual en formato YYYY-M
  const monthString = () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth() + 1}`;
  };

  const currentMonth = monthString();

  useEffect(() => {
    // colección específica por mes
    const colRef = collection(db, "donations-" + currentMonth);
    const q = query(colRef, orderBy("date", "asc"));

    // Escuchar cambios en tiempo real
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDonations(data);
    });

    return () => unsubscribe();
  }, [currentMonth]);

  // Agregar donación
  const addDonation = async (donation) => {
    try {
      const colRef = collection(db, "donations-" + currentMonth);
      await addDoc(colRef, donation);
    } catch (error) {
      console.error("Error agregando aporte:", error);
    }
  };

  // Editar donación
  const updateDonation = async (index, newDonation) => {
    try {
      const donationId = donations[index].id;
      const docRef = doc(db, "donations-" + currentMonth, donationId);
      await updateDoc(docRef, newDonation);
    } catch (error) {
      console.error("Error editando aporte:", error);
    }
  };

  // Eliminar donación
  const removeDonation = async (index) => {
    try {
      const donationId = donations[index].id;
      const docRef = doc(db, "donations-" + currentMonth, donationId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error eliminando aporte:", error);
    }
  };

  // Suma total
  const total = donations.reduce((sum, d) => sum + Number(d.amount), 0);

  return (
    <div className="container">
      <h1>Meta Familiar ❤️</h1>

      <p className="message">
        "El amor de una familia es el mayor regalo de la vida.  
        Cada pequeño aporte es una muestra de cariño, unión y esperanza."
      </p>

      <ProgressBar total={total} goal={GOAL} />
      <DonationForm addDonation={addDonation} />
      <DonationList
        donations={donations}
        updateDonation={updateDonation}
        removeDonation={removeDonation}
      />
    </div>
  );
}