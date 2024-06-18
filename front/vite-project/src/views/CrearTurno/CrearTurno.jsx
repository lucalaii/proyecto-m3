import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAppointments } from "../../redux/slice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./CrearTurno.module.css";

export const CrearTurno = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.gym.userId);

  const navigate = useNavigate();

  const [turnoData, setTurnoData] = useState({
    date: "",
    time: "",
  });

  const [createStatus, setCreateStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTurnoData({
      ...turnoData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!turnoData.date || !turnoData.time) {
      setCreateStatus("Por favor, completa todos los campos.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/appointments/schedule",
        {
          date: turnoData.date,
          time: turnoData.time,
          userId: userId,
        }
      );

      if (response) {
        dispatch(updateAppointments(response.data.appointments));
        console.log(response.data.appointments);
        setCreateStatus("Turno creado exitosamente!");
        navigate("/misTurnos");
      } else {
        setCreateStatus("Error al crear el turno. Inténtalo de nuevo.");
      }
    } catch (error) {
      setCreateStatus("Error al crear el turno. Inténtalo de nuevo.");
    }
  };

  const isFormValid = () => {
    return turnoData.date.trim() !== "" && turnoData.time.trim() !== "";
  };

  if (!userId) {
    return (
      <>
        <h1 className={styles.title}>Sacar Turno</h1>
        <div>
          <p className={styles.p}>
            Tienes que iniciar sesión para sacar un turno.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className={styles.title}>Sacar Turno</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.createTurnoForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="date" className={styles.label}>
              Fecha:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={turnoData.date}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="time" className={styles.label}>
              Hora:
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={turnoData.time}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={!isFormValid()}
          >
            Sacar Turno
          </button>
          <div className={styles.createStatusMsg}>{createStatus}</div>
        </form>
      </div>
    </>
  );
};
