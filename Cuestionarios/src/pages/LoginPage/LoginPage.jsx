import React, { useState } from "react";
import "./LoginPage.css";

function LoginPage({ nuevoUsuario }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      nuevoUsuario(username);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default LoginPage;