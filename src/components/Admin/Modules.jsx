import React, { useState } from "react";
import { modules as modulesData } from "../../services/data";
import { filieres } from "../../services/data";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/footer";

function Modules() {
  const [modules] = useState(modulesData);
  const [editIdx, setEditIdx] = useState(null);
  const [editData, setEditData] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [addData, setAddData] = useState({
    name: "",
    filiereId: []
  });

  // Gestion du changement pour la modification
  const handleEditChange = (e) => {
    const { name, value, selectedOptions } = e.target;
    if (name === "filiereId") {
      setEditData({
        ...editData,
        filiereId: Array.from(selectedOptions, option => Number(option.value))
      });
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };

  // Gestion du changement pour l'ajout
  const handleAddChange = (e) => {
    const { name, value, selectedOptions } = e.target;
    if (name === "filiereId") {
      setAddData({
        ...addData,
        filiereId: Array.from(selectedOptions, option => Number(option.value))
      });
    } else {
      setAddData({ ...addData, [name]: value });
    }
  };

  // Pas de validation, juste fermeture du mode édition
  const handleEditSave = () => {
    setEditIdx(null);
    setEditData({});
  };

  // Pas de suppression
  const handleDelete = (idx) => {};

  // Editer un module
  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditData(modules[idx]);
  };

  // Ajouter un module (pas d'ajout, juste fermeture du modal)
  const handleAddModule = (e) => {
    e.preventDefault();
    setAddData({
      name: "",
      filiereId: []
    });
    setShowAdd(false);
  };

  return (
    <div className="content">
      <NavBar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">Gestion des modules</h3>
          <button className="btn btn-success" onClick={() => setShowAdd(true)}>
            <i className="fa fa-plus"></i> Ajouter module
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Nom du module</th>
                <th>Filières</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((module, idx) =>
                editIdx === idx ? (
                  <tr key={module.id || idx}>
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
                      <select
                        className="form-select"
                        name="filiereId"
                        value={editData.filiereId}
                        onChange={handleEditChange}
                        multiple
                        required
                      >
                        {filieres.map(f => (
                          <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                      </select>
                      <small className="text-muted">Ctrl/Cmd+clic pour multi-sélection</small>
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
                  <tr key={module.id || idx}>
                    <td>{module.name}</td>
                    <td>
                      {(module.filiereId || [])
                        .map(fid => filieres.find(f => f.id === Number(fid))?.name)
                        .filter(Boolean)
                        .join(", ") || "—"}
                    </td>
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
              {modules.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center text-muted">
                    Aucun module trouvé.
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
              <form onSubmit={handleAddModule}>
                <div className="modal-header">
                  <h5 className="modal-title">Ajouter un module</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAdd(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-2">
                    <label className="form-label">Nom du module</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={addData.name}
                      onChange={handleAddChange}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Filières</label>
                    <select
                      className="form-select"
                      name="filiereId"
                      value={addData.filiereId}
                      onChange={handleAddChange}
                      multiple
                      required
                    >
                      {filieres.map(f => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                    <small className="text-muted">Ctrl/Cmd+clic pour multi-sélection</small>
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

export default Modules;