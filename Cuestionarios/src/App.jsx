
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.jsx"
import CuestionariosPage from "./pages/CustionariosPage/CuestionariosPage.jsx"
import ListaPreguntasPage from "./pages/ListaPreguntasPage/ListaPreguntasPage.jsx"
import PreguntaPage from "./pages/PreguntaPage/PreguntaPage.jsx"
import CrearPreguntaPage from './pages/CrearPreguntaPage/CrearPeguntaPage.jsx';
import { UserProvider } from "./context/UserContext";

function App() {
  const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  return (
    <UserProvider>
      <Routes>
        <Route path="/*" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        {currentUser !== null && <><Route path="/cuestionarios" element={<CuestionariosPage />} />
          <Route path="/cuestionarios/:idCuestionario" element={<ListaPreguntasPage />} />
          <Route path="/cuestionarios/:idCuestionario/:idPregunta" element={<PreguntaPage />} />
          <Route path="/cuestionarios/:idCuestionario/crearPregunta" element={<CrearPreguntaPage />} /> </>}
      </Routes>
    </UserProvider>
  );
}

export default App
