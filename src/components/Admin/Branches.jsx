import React, { useState } from "react";
import { filieres as filieresData } from "../../services/data";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/footer";

function Branches() {
  const [filieres] = useState(filieresData);
  const [editIdx, setEditIdx] = useState(null);
  const [editData, setEditData] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [addData, setAddData] = useState({
    name: ""
  });

  // Gestion du changement pour la modification
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Gestion du changement pour l'ajout
  const handleAddChange = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };

  // Pas de validation, juste fermeture du mode édition
  const handleEditSave = () => {
    setEditIdx(null);
    setEditData({});
  };

  // Pas de suppression
  const handleDelete = (idx) => {};

  // Editer une filière
  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditData(filieres[idx]);
  };

  // Ajouter une filière (pas d'ajout, juste fermeture du modal)
  const handleAddFiliere = (e) => {
    e.preventDefault();
    setAddData({ name: "" });
    setShowAdd(false);
  };

  return (
    <div className="content">
      <NavBar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">Gestion des filières</h3>
          <button className="btn btn-success" onClick={() => setShowAdd(true)}>
            <i className="fa fa-plus"></i> Ajouter filière
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Nom de la filière</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filieres.map((filiere, idx) =>
                editIdx === idx ? (
                  <tr key={filiere.id || idx}>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        required
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={handleEditSave}
                      >
                        <i className="fa fa-check"></i>
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditIdx(null)}
                      >
                        <i className="fa fa-times"></i>
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={filiere.id || idx}>
                    <td>{filiere.name}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(idx)}
                        title="Modifier"
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        title="Supprimer"
                        // onClick={() => handleDelete(idx)} // Pas d'effet
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                )
              )}
              {filieres.length === 0 && (
                <tr>
                  <td colSpan={2} className="text-center text-muted">
                    Aucune filière trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />

      {/* Modal d'ajout */}
      {showAdd && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div
              className="modal-content"
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <form onSubmit={handleAddFiliere}>
                <div className="modal-header">
                  <h5 className="modal-title">Ajouter une filière</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAdd(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-2">
                    <label className="form-label">Nom de la filière</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={addData.name}
                      onChange={handleAddChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAdd(false)}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-success">
                    Ajouter
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

export default Branches;