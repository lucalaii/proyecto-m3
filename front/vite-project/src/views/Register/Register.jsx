import { useState } from "react";
import axios from "axios";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dni: "",
    email: "",
    birthdate: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/users/register", formData);
      alert("Registro exitoso");
      navigate("/login");
    } catch (error) {
      alert("Error en el registro");
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.dni.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.birthdate.trim() !== "" &&
      formData.username.trim() !== "" &&
      formData.password.trim() !== ""
    );
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="dni">DNI:</label>
          <input
            type="number"
            id="dni"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="birthdate">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="username">Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className={styles.button}
          disabled={!isFormValid()}
        >
          Registrar
        </button>
      </form>
    </div>
  );
};
