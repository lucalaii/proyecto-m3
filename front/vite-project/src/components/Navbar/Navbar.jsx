import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUserId } from "../../redux/slice";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const userId = useSelector((state) => state.gym.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(resetUserId());
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <img
        src="https://turbologo.com/articles/wp-content/uploads/2020/12/fitness-3.png"
        alt="Gym Logo"
        className={styles.gymLogo}
      />
      <ul className={styles.ul}>
        <li className={styles.li}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
        </li>
        {!!userId && (
          <li className={styles.li}>
            <Link to="/misTurnos" className={styles.link}>
              Mis Turnos
            </Link>
          </li>
        )}
        {!!userId && (
          <li className={styles.li}>
            <Link to="/sacarTurno" className={styles.link}>
              Sacar Turno
            </Link>
          </li>
        )}
      </ul>
      <div className={styles.authLinks}>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link to="/login" className={styles.link}>
              Iniciar sesión
            </Link>
          </li>
          <button onClick={handleLogout} className={styles.buttonCerrarSesion}>
            Cerrar Sesión
          </button>
          <li className={styles.li}>
            <Link to="/register" className={styles.link}>
              Registrarse
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
