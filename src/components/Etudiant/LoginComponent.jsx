import React, { useState } from "react";
import { etudiant } from "../../services/data";

function LoginComponent({ onLogin }) {
  const [codeAppogee, setCodeAppogee] = useState("");
  const [motPasse, setMotPasse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      codeAppogee === etudiant.codeAppogee &&
      motPasse === etudiant.motPasse
    ) {
      setError("");
      if (onLogin) onLogin(etudiant);
    } else {
      setError("Code Apogée ou mot de passe incorrect.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <form className="card p-4" style={{ minWidth: 350 }} onSubmit={handleSubmit}>
        <h3 className="mb-4 text-center">Connexion Étudiant</h3>
        <div className="mb-3">
          <label className="form-label">Code Apogée</label>
          <input
            type="text"
            className="form-control"
            value={codeAppogee}
            onChange={(e) => setCodeAppogee(e.target.value)}
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