import React, { useState } from "react";
import { prof } from "../../services/data";

function LoginComponent({ onLogin }) {
  const [codeProf, setCodeProf] = useState("");
  const [motPasse, setMotPasse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      codeProf === prof.codeProf &&
      motPasse === prof.motPasse
    ) {
      setError("");
      if (onLogin) onLogin(prof);
    } else {
      setError("Code Apogée ou mot de passe incorrect.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <form className="card p-4" style={{ minWidth: 350 }} onSubmit={handleSubmit}>
        <h3 className="mb-4 text-center">Connexion Enseignant</h3>
        <div className="mb-3">
          <label className="form-label">Code Prof</label>
          <input
            type="text"
            className="form-control"
            value={codeProf}
            onChange={(e) => setCodeProf(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            value={motPasse}
            onChange={(e) => setMotPasse(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <button type="submit" className="btn btn-primary w-100">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default LoginComponent;