import React, { useState } from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/footer";
import { users } from "../../services/data";

function Profile() {
  // Récupérer l'utilisateur connecté depuis le localStorage
  const userLS = JSON.parse(localStorage.getItem("user") || "null");
  // Trouver l'objet user complet dans users (pour avoir toutes les infos à jour)
  const userEntry = users.find((u) => u.user.email === userLS?.email);
  const initialUser = userEntry ? userEntry.user : null;

  const [etudiant, setEtudiant] = useState(initialUser);
  const [motPasse, setMotPasse] = useState("");
  const [image, setImage] = useState(etudiant ? etudiant.image : "");
  const [message, setMessage] = useState("");

  if (!etudiant) {
    return (
      <div className="content">
        <NavBar />
        <div className="container mt-5">
          <div className="alert alert-danger text-center">
            Utilisateur introuvable.
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePasswordChange = (e) => {
    setMotPasse(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEtudiant({
      ...etudiant,
      motPasse: motPasse ? motPasse : etudiant.motPasse,
      image: image,
    });
    setMessage("Profil mis à jour !");
    setMotPasse("");
  };

  return (
    <div className="content">
      <NavBar />
      <div className="container mt-5">
        <h3 className="mb-4 text-center">Mon Profil</h3>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="card p-4">
              <div className="text-center mb-3">
                <img
                  src={
                    image || etudiant.img || "https://via.placeholder.com/120"
                  }
                  alt="Profil"
                  className="rounded-circle"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="mb-3 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control"
                />
              </div>
              {etudiant.codeAppogee && (
                <div className="mb-3">
                  <label className="form-label">Code Apogée</label>
                  <input
                    type="text"
                    className="form-control"
                    value={etudiant.codeAppogee}
                    disabled
                  />
                </div>
              )}
              {etudiant.codeProf && (
                <div className="mb-3">
                  <label className="form-label">Code Prof</label>
                  <input
                    type="text"
                    className="form-control"
                    value={etudiant.codeProf}
                    disabled
                  />
                </div>
              )}
              {etudiant.codeAdmin && (
                <div className="mb-3">
                  <label className="form-label">Code Admin</label>
                  <input
                    type="text"
                    className="form-control"
                    value={etudiant.codeAdmin}
                    disabled
                  />
                </div>
              )}
              <div className="mb-3">
                <label className="form-label">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  value={etudiant.nom}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  value={etudiant.prenom}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={etudiant.email}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Téléphone</label>
                <input
                  type="text"
                  className="form-control"
                  value={etudiant.telephone}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nouveau mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  value={motPasse}
                  onChange={handlePasswordChange}
                  placeholder="Changer le mot de passe"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Mettre à jour
              </button>
              {message && (
                <div className="alert alert-success mt-3 text-center">
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;