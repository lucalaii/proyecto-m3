import styles from "./Home.module.css";

export const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>Bienvenido a Nuestro Gimnasio</h1>
        <img
          src="https://turbologo.com/articles/wp-content/uploads/2020/12/fitness-3.png"
          alt="Gym Logo"
          className={styles.gymLogo}
        />
        <p className={styles.p}>
          Únete a nosotros y transforma tu vida. Reserva tu turno ahora.
        </p>
        <p>
          Recuerda que debes tener una cuenta e iniciar sesión para sacar el
          turno, si no tienes una te invito a registrarte.
        </p>
      </div>
    </>
  );
};
