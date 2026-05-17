import { useState, useEffect } from "react";

import "./App.css";

import ProgressBar from "./components/ProgressBar";
import DonationForm from "./components/DonationForm";
import DonationList from "./components/DonationList";
import History from "./components/History";

import {
  db,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs
} from "./firebase";

const GOAL = 13700;

export default function App() {
  const [donations, setDonations] = useState([]);
  const [history, setHistory] = useState([]);

  const monthString = () => {
    const now = new Date();

    return `${now.getFullYear()}-${now.getMonth() + 1}`;
  };

  const currentMonth = monthString();

  useEffect(() => {
    const colRef = collection(
      db,
      "donations-" + currentMonth
    );

    const q = query(
      colRef,
      orderBy("date", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data()
          })
        );

        setDonations(data);
      }
    );

    return () => unsubscribe();
  }, [currentMonth]);

  useEffect(() => {
    const loadHistory = async () => {
      const months = [
        "2026-3",
        "2026-4",
        "2026-5"
      ];

      const historyData = [];

      for (const month of months) {
        const snapshot = await getDocs(
          collection(
            db,
            "donations-" + month
          )
        );

        const docs = snapshot.docs.map(
          (doc) => doc.data()
        );

        const total = docs.reduce(
          (sum, d) =>
            sum + Number(d.amount),
          0
        );

        historyData.push({
          month,
          total
        });
      }

      historyData.sort((a, b) =>
        b.month.localeCompare(a.month)
      );

      setHistory(historyData);
    };

    loadHistory();
  }, []);

  const addDonation = async (
    donation
  ) => {
    const colRef = collection(
      db,
      "donations-" + currentMonth
    );

    await addDoc(colRef, donation);
  };

  const updateDonation = async (
    index,
    newDonation
  ) => {
    const donationId =
      donations[index].id;

    const docRef = doc(
      db,
      "donations-" + currentMonth,
      donationId
    );

    await updateDoc(
      docRef,
      newDonation
    );
  };

  const removeDonation = async (
    index
  ) => {
    const donationId =
      donations[index].id;

    const docRef = doc(
      db,
      "donations-" + currentMonth,
      donationId
    );

    await deleteDoc(docRef);
  };

  const total = donations.reduce(
    (sum, d) =>
      sum + Number(d.amount),
    0
  );

  return (
    <div className="container">
      <h1>
        ❤️ Recolecta Familiar ❤️
      </h1>

      <p className="message">
        Cada aporte representa amor,
        apoyo y unión familiar.
      </p>

      <ProgressBar
        total={total}
        goal={GOAL}
      />

      <DonationForm
        addDonation={addDonation}
      />

      <DonationList
        donations={donations}
        updateDonation={
          updateDonation
        }
        removeDonation={
          removeDonation
        }
      />

      <History history={history} />
    </div>
  );
}