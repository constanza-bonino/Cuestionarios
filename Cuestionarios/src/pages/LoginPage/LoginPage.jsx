import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useUser } from "../../context/UserContext";

function LoginPage() {
    const navigate = useNavigate();
    const usuarioActual = useRef(null);
  	const { setCurrentUser } = useUser();

    const fetchUsuario = async (nombre) => {
        try {
            const url = `http://localhost:3000/usuarios/?nombre=${nombre}`;
            console.log(url);
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            return data ? data[0] : undefined;
        } catch (err) {
            console.error("Failed to fetch:", err);
        }
    };

    const crearUsuario = async (nombre) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre: nombre }),
        };
        const response = await fetch(
            "http://localhost:3000/usuarios/",
            requestOptions
        );
        const data = await response.json();
        return data;
    };

    const logIn = async (e) => {
        e.preventDefault();
        if (usuarioActual.current.value.trim() !== "") {
            let user = await fetchUsuario(usuarioActual.current.value);
            if (!user) {
                user = await crearUsuario(usuarioActual.current.value);
            }
			// setUsuario(user);
			setCurrentUser(user);
            navigate("/cuestionarios");
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar sesión</h2>
            <input type="text" placeholder="Usuario" ref={usuarioActual} />
            <button type="submit" onClick={logIn}>
                Entrar
            </button>
        </div>
    );
}

export default LoginPage;
