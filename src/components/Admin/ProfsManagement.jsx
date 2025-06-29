import React, { useState } from "react";
import { users, filieres } from "../../services/data";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/footer";

function ProfsManagement() {
  // Filtrer les profs depuis users
  const [profs, setProfs] = useState(
    users
      .filter(u => u.user.role === "prof")
      .map(u => ({ ...u.user, userId: u.id }))
  );
  const [editIdx, setEditIdx] = useState(null);
  const [editData, setEditData] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [addData, setAddData] = useState({
    codeProf: "",
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    motPasse: "",
    image: "",
    img: "",
    role: "prof",
    modules: [],
    filieres: []
  });

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setEditData(profs[idx]);
  };

  const handleEditChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (name === "filieres") {
      setEditData({
        ...editData,
        filieres: Array.from(selectedOptions, option => Number(option.value))
      });
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };

  const handleAddChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (name === "filieres") {
      setAddData({
        ...addData,
        filieres: Array.from(selectedOptions, option => Number(option.value))
      });
    } else {
      setAddData({ ...addData, [name]: value });
    }
  };

  return (
    <div className="content">
      <NavBar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">Gestion des professeurs</h3>
          <button className="btn btn-success" onClick={() => setShowAdd(true)}>
            <i className="fa fa-plus"></i> Ajouter professeur
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Photo</th>
                <th>Code Prof</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Filières</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {profs.map((prof, idx) =>
                editIdx === idx ? (
                  <tr key={prof.id || idx}>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="img"
                        value={editData.img}
                        onChange={handleEditChange}
                        placeholder="URL image"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="codeProf"
                        value={editData.codeProf}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="nom"
                        value={editData.nom}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="prenom"
                        value={editData.prenom}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={editData.email}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        name="telephone"
                        value={editData.telephone}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <select
                        className="form-select"
                        name="filieres"
                        value={editData.filieres || []}
                        onChange={handleEditChange}
                        multiple
                      >
                        {filieres.map(f => (
                          <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => setEditIdx(null)} // Ferme juste le mode édition, ne modifie rien
                      >
                        <i className="fa fa-check"></i>
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditIdx(null)}>
                        <i className="fa fa-times"></i>
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={prof.id || idx}>
                    <td>
                      <img
                        src={prof.img || "https://via.placeholder.com/60"}
                        alt="profil"
                        style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "50%" }}
                      />
                    </td>
                    <td>{prof.codeProf}</td>
                    <td>{prof.nom}</td>
                    <td>{prof.prenom}</td>
                    <td>{prof.email}</td>
                    <td>{prof.telephone}</td>
                    <td>
                      {(prof.filieres || [])
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
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                )
              )}
              {profs.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-muted">
                    Aucun professeur trouvé.
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
              <form
                onSubmit={e => {
                  e.preventDefault();
                  setProfs([
                    ...profs,
                    {
                      ...addData,
                      id: Date.now(),
                      img: addData.img || "https://via.placeholder.com/120"
                    }
                  ]);
                  setAddData({
                    codeProf: "",
                    nom: "",
                    prenom: "",
                    email: "",
                    telephone: "",
                    motPasse: "",
                    image: "",
                    img: "",
                    role: "prof",
                    modules: [],
                    filieres: []
                  });
                  setShowAdd(false);
                }}
              >
                <div className="modal-header">
                  <h5 className="modal-title">Ajouter un professeur</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAdd(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-2">
                    <label className="form-label">Code Prof</label>
                    <input
                      type="text"
                      className="form-control"
                      name="codeProf"
                      value={addData.codeProf}
                      onChange={handleAddChange}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nom"
                      value={addData.nom}
                      onChange={handleAddChange}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Prénom</label>
                    <input
                      type="text"
                      className="form-control"
                      name="prenom"
                      value={addData.prenom}
                      onChange={handleAddChange}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={addData.email}
                      onChange={handleAddChange}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Téléphone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="telephone"
                      value={addData.telephone}
                      onChange={handleAddChange}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      name="motPasse"
                      value={addData.motPasse}
                      onChange={handleAddChange}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Image (URL)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="img"
                      value={addData.img}
                      onChange={handleAddChange}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Filières</label>
                    <select
                      className="form-select"
                      name="filieres"
                      value={addData.filieres}
                      onChange={handleAddChange}
                      multiple
                      required
                    >
                      {filieres.map(f => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                    <small className="text-muted">Maintenez Ctrl (Windows) ou Cmd (Mac) pour sélectionner plusieurs filières.</small>
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

export default ProfsManagement;