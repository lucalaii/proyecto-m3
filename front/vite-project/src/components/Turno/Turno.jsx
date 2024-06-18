import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateAppointments } from "../../redux/slice";
import axios from "axios";
import styles from "./Turno.module.css";

export const Turno = ({ id, date, time, status, onUpdateTurnos }) => {
  const dispatch = useDispatch();
  const [cancelStatus, setCancelStatus] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const cancelTurno = async () => {
    setShowConfirmDialog(false);
    try {
      const response = await axios.put(
        "http://localhost:3000/appointments/cancel",
        { id }
      );
      if (response) {
        dispatch(updateAppointments(response.data.updatedAppointments));
        setCancelStatus("Turno cancelado exitosamente");
        onUpdateTurnos();
      } else {
        setCancelStatus("Error al cancelar el turno. Inténtalo de nuevo");
      }
    } catch (error) {
      setCancelStatus("Error al cancelar el turno. Inténtalo de nuevo");
    }
  };

  const handleCancelClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmCancel = () => {
    cancelTurno();
  };

  return (
    <>
      <div className={styles.turnoCard}>
        <h4>Fecha: {date}</h4>
        <h4>Hora: {time}</h4>
        <h4>Estado: {status ? "Activo" : "Cancelado"}</h4>
        {status ? (
          <>
            <button
              type="button"
              onClick={handleCancelClick}
              className={styles.button}
            >
              Cancelar turno
            </button>
            {showConfirmDialog && (
              <div className={styles.confirmDialog}>
                <p>¿Estás seguro de que quieres cancelar el turno?</p>
                <button onClick={handleConfirmCancel}>Aceptar</button>
                <button onClick={() => setShowConfirmDialog(false)}>
                  Cancelar
                </button>
              </div>
            )}
          </>
        ) : (
          <p>Turno cancelado</p>
        )}
        {cancelStatus && <p className={styles.cancelStatus}>{cancelStatus}</p>}
      </div>
    </>
  );
};

Turno.propTypes = {
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  onUpdateTurnos: PropTypes.func.isRequired,
};
