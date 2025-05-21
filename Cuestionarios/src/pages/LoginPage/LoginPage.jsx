import { useRef} from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage({ nuevoUsuario }) {

  const navigate = useNavigate();

  const usuarioActual = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuarioActual.current.value.trim() !== "") {
      nuevoUsuario(usuarioActual.current.value);
      navigate("/cuestionarios")
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        ref={usuarioActual}
      />
      <button type="submit" onClick={handleSubmit}>Entrar</button>
    </div>
  );
}

export default LoginPage;