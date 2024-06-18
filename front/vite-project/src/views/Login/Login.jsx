import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserId } from "../../redux/slice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";

export const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [loginStatus, setLoginStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!loginData.username || !loginData.password) {
      setLoginStatus("Por favor, completa todos los campos.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        loginData
      );

      if (response) {
        dispatch(updateUserId(response.data.user.id));
        setLoginStatus("Login exitoso!");
        navigate("/misTurnos");
      } else {
        setLoginStatus("Error en el login. Inténtalo de nuevo");
      }
    } catch (error) {
      setLoginStatus("Nombre de usuario o contraseña incorrectos");
    }
  };

  const isFormValid = () => {
    return loginData.username.trim() !== "" && loginData.password.trim() !== "";
  };

  return (
    <>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>
              Usuario:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
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
            Iniciar sesión
          </button>
          <div
            className={
              loginStatus === "Login exitoso!"
                ? styles.successMsg
                : styles.errorMsg
            }
          >
            {loginStatus}
          </div>
        </form>
      </div>
    </>
  );
};
