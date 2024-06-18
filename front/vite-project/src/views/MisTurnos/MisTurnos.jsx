import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateAppointments } from "../../redux/slice";
import { Turno } from "../../components/Turno/Turno";
import { fechaFormat } from "../../helpers/fechaFormat";
import styles from "./MisTurnos.module.css";

export const MisTurnos = () => {
  const userId = useSelector((state) => state.gym.userId);
  const appointments = useSelector((state) => state.gym.appointments);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3000/users/${userId}`)
        .then((res) => {
          dispatch(updateAppointments(res.data.appointments));
          console.log(res.data.appointments);
        })
        .catch((err) => console.error(err));
    }
  }, [userId, dispatch]);

  const updateTurnos = () => {
    axios
      .get(`http://localhost:3000/users/${userId}`)
      .then((res) => {
        dispatch(updateAppointments(res.data.appointments));
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h1 className={styles.title}>Mis turnos</h1>
      <div className={styles.container}>
        {userId ? (
          appointments && appointments.length > 0 ? (
            appointments.map((turno) => (
              <Turno
                key={turno.id}
                id={turno.id}
                date={fechaFormat(turno.date)}
                time={turno.time}
                status={turno.status}
                onUpdateTurnos={updateTurnos}
              />
            ))
          ) : (
            <p className={styles.p}>
              No hay turnos agendados para este usuario.
            </p>
          )
        ) : (
          <p className={styles.p}>
            Debes iniciar sesión para poder ver los turnos.
          </p>
        )}
      </div>
    </>
  );
};
