import { useState } from "react";

export default function History({ history }) {
  const [showHistory, setShowHistory] = useState(false);

  const formatMonth = (monthKey) => {
    const [year, month] = monthKey.split("-");

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

    return `${months[Number(month) - 1]} ${year}`;
  };

  const formatCurrency = (value) => {
    return Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="history-section">
      <button
        className="history-button"
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory
          ? "Ocultar Historial"
          : "📜 Ver Historial"}
      </button>

      {showHistory && (
        <div className="history-list">
          {history.map((item, index) => (
            <div
              key={index}
              className="history-card"
            >
              <h3>
                {formatMonth(item.month)}
              </h3>

              <p>
                Total recolectado:
                <strong>
                  {" "}
                  C$ {formatCurrency(item.total)}
                </strong>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}