import React, { useState } from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/footer";
import { users } from "../../services/data";

function Annocements({ annoncements, onPublish }) {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Associer chaque annoncement à son auteur complet
  const getAuthor = (authorId) => {
    const entry = users.find((u) => u.id === authorId);
    return entry ? entry.user : null;
  };

  // Trier les annoncements du plus récent au plus ancien
  const sorted = [...annoncements]
    .map((a) => ({
      ...a,
      authorObj: getAuthor(a.author),
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Publier un nouvel annoncement
  const handlePublish = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError("Le message ne peut pas être vide.");
      return;
    }
    // Récupérer l'utilisateur connecté (prof ou admin)
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user || !user.role) {
      setError("Utilisateur non authentifié.");
      return;
    }
    const newAnn = {
      id: Date.now(),
      message,
      author: users.find((u) => u.user.email === user.email)?.id ?? 0,
      date: new Date().toISOString().slice(0, 10),
    };
    if (typeof onPublish === "function") {
      onPublish(newAnn);
    }
    setShowModal(false);
    setMessage("");
    setError("");
  };

  return (
    <div className="content">
      <NavBar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-center flex-grow-1">Annoncements</h3>
          <button
            className="btn btn-success ms-3"
            onClick={() => setShowModal(true)}
          >
            <i className="fa fa-plus"></i> Publier un annoncement
          </button>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8">
            {sorted.map((a) => (
              <div className="card mb-3" key={a.id}>
                <div className="card-body">
                  <p className="card-text">{a.message}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      {a.authorObj
                        ? (a.authorObj.role === "admin"
                            ? "Admin"
                            : a.authorObj.role === "prof"
                            ? "Prof"
                            : "Étudiant"
                          ) +
                          " : " +
                          (a.authorObj.nom || a.authorObj.name)
                        : "Auteur inconnu"}
                    </small>
                    <small className="text-muted">{a.date}</small>
                  </div>
                </div>
              </div>
            ))}
            {sorted.length === 0 && (
              <div className="alert alert-info text-center">
                Aucun annoncement pour le moment.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />

      {/* Modal publier annoncement */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.5)",
          }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handlePublish}>
                <div className="modal-header">
                  <h5 className="modal-title">Publier un annoncement</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowModal(false);
                      setMessage("");
                      setError("");
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      required
                    />
                  </div>
                  {error && (
                    <div className="alert alert-danger py-2">{error}</div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModal(false);
                      setMessage("");
                      setError("");
                    }}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-success">
                    Publier
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Annocements;