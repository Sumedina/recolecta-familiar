import { useState } from "react";

export default function History({ history }) {
  const [showHistory, setShowHistory] = useState(false);
  const [openMonth, setOpenMonth] = useState(null);

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

  return (
    <div className="history-section">

      <button
        className="history-button"
        onClick={() =>
          setShowHistory(!showHistory)
        }
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
              onClick={() =>
                setOpenMonth(
                  openMonth === item.month
                    ? null
                    : item.month
                )
              }
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

              {openMonth === item.month && (

                <div className="history-details">

                  {item.donations.map(
                    (donation, i) => (

                      <div
                        key={i}
                        className="history-donation"
                      >

                        <div>
                          <strong>
                            {donation.name}
                          </strong>
                        </div>

                        <div>
                            {formatCurrency(
                            donation.amount
                          )}
                        </div>

                        <div>
                          {formatDate(
                            donation.date
                          )}
                        </div>

                      </div>
                    )
                  )}

                </div>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}