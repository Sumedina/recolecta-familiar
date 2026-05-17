import { useState } from "react";

export default function DonationList({ donations, updateDonation, removeDonation }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    amount: "",
    date: ""
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const startEditing = (index) => {
    setEditingIndex(index);

    setEditData({
      name: donations[index].name,
      amount: donations[index].amount,
      date: donations[index].date
    });
  };

  const saveEdit = (index) => {
    updateDonation(index, {
      name: editData.name,
      amount: Number(editData.amount),
      date: editData.date
    });

    setEditingIndex(null);
  };

  return (
    <table className="donation-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Monto en C$</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {donations.map((d, index) => (
          <tr key={index}>
            {editingIndex === index ? (
              <>
                <td>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        name: e.target.value
                      })
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={editData.amount}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        amount: e.target.value
                      })
                    }
                  />
                </td>

                <td>
                  <input
                    type="date"
                    value={editData.date}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        date: e.target.value
                      })
                    }
                  />
                </td>

                <td>
                  <button onClick={() => saveEdit(index)}>
                    💾 Guardar
                  </button>

                  <button onClick={() => setEditingIndex(null)}>
                    ❌ Cancelar
                  </button>
                </td>
              </>
            ) : (
              <>
                <td>{d.name}</td>

                <td>
                    {Number(d.amount).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </td>

                <td>{formatDate(d.date)}</td>

                <td>
                  <button onClick={() => startEditing(index)}>
                    ✏️ Editar
                  </button>

                  <button onClick={() => removeDonation(index)}>
                    🗑️ Eliminar
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}