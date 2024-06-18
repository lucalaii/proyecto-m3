import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./views/Home/Home";
import { MisTurnos } from "./views/MisTurnos/MisTurnos";
import { Navbar } from "./components/Navbar/Navbar";
import { Register } from "./views/Register/Register";
import { Login } from "./views/Login/Login";
import { CrearTurno } from "./views/CrearTurno/CrearTurno";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/misTurnos" element={<MisTurnos />} />
        <Route path="/sacarTurno" element={<CrearTurno />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
