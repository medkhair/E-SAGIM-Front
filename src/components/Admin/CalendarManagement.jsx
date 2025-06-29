import React, { useState } from "react";
import { calendrier as calendrierData, calendrier2, filieres } from "../../services/data";
import { modules } from "../../services/data";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/footer";

function getModuleName(modules, moduleId) {
  const module = modules.find((m) => m.id === moduleId);
  return module ? module.name : "Inconnu";
}

function CalendarManagement() {
  const [showAdd, setShowAdd] = useState(false);
  const [selectedFiliere, setSelectedFiliere] = useState("");

  // Trouver la filière sélectionnée
  const filiereObj = filieres.find(f => String(f.id) === String(selectedFiliere));

  // Choisir le calendrier selon la filière
  let calendrier = calendrierData;
  if (filiereObj && filiereObj.idCalendrier === 2) {
    calendrier = calendrier2;
  }

  const [addData, setAddData] = useState({
    day: "",
    heure: "",
    module: ""
  });
  const [editIdx, setEditIdx] = useState(null);
  const [editData, setEditData] = useState({});

  // Ajout (pas d'effet, juste fermeture)
  const handleAddCourse = (e) => {
    e.preventDefault();
    setAddData({ day: "", heure: "", module: "" });
    setShowAdd(false);
  };

  // Edition (pas d'effet, juste fermeture)
  const handleEditSave = () => {
    setEditIdx(null);
    setEditData({});
  };

  // Suppression (pas d'effet)
  const handleDelete = (dayIdx, courseIdx) => {};

  // Ouvre le mode édition
  const handleEdit = (dayIdx, courseIdx) => {
    setEditIdx({ dayIdx, courseIdx });
    const course = calendrier[dayIdx].courses[courseIdx];
    setEditData({
      day: calendrier[dayIdx].day,
      heure: course.heure,
      module: course.module
    });
  };

  // Gestion du changement pour l'ajout
  const handleAddChange = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };

  // Gestion du changement pour l'édition
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Liste des jours pour le select
  const jours = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche"
  ];

  // Mise à jour du select filière pour utiliser idCalendrier
  // On ne garde que les filières qui ont un idCalendrier (donc qui ont un calendrier associé)
  const filieresWithCalendrier = filieres.filter(f => f.idCalendrier);

  // Filtrer les modules selon la filière sélectionnée
  const filteredModules = selectedFiliere
    ? modules.filter(m =>
        Array.isArray(m.filiereId)
          ? m.filiereId.includes(Number(selectedFiliere))
          : m.filiereId === Number(selectedFiliere)
      )
    : modules;

  return (
    <div className="content">
      <NavBar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">Gestion du calendrier</h3>
          <button className="btn btn-success" onClick={() => setShowAdd(true)}>
            <i className="fa fa-plus"></i> Ajouter un cours
          </button>
        </div>
        <div className="mb-4">
          <label className="form-label me-2">Filtrer par filière :</label>
          <select
            className="form-select d-inline-block w-auto"
            value={selectedFiliere}
            onChange={e => setSelectedFiliere(e.target.value)}
          >
            <option value="">Toutes les filières</option>
            {filieresWithCalendrier.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>
        <div className="row">
          {calendrier.map((day, dayIdx) => (
            <div className="col-md-4 mb-4" key={dayIdx}>
              <div className="card h-100">
                <div className="card-header bg-primary text-white text-center">
                  <strong>{day.day}</strong>
                </div>
                <ul className="list-group list-group-flush">
                  {day.courses.length === 0 ? (
                    <li className="list-group-item text-center text-muted">
                      Aucun cours
                    </li>
                  ) : (
                    day.courses
                      .filter(course =>
                        !selectedFiliere ||
                        filteredModules.some(m => m.id === course.module)
                      )
                      .map((course, courseIdx) =>
                        editIdx &&
                        editIdx.dayIdx === dayIdx &&
                        editIdx.courseIdx === courseIdx ? (
                          <li className="list-group-item" key={courseIdx}>
                            <form
                              className="row g-2 align-items-center"
                              onSubmit={e => {
                                e.preventDefault();
                                handleEditSave();
                              }}
                            >
                              <div className="col-5">
                                <select
                                  className="form-select"
                                  name="module"
                                  value={editData.module}
                                  onChange={handleEditChange}
                                  required
                                >
                                  <option value="">Module</option>
                                  {filteredModules.map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="col-4">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="heure"
                                  value={editData.heure}
                                  onChange={handleEditChange}
                                  placeholder="Heure"
                                  required
                                />
                              </div>
                              <div className="col-3 d-flex gap-1">
                                <button
                                  type="submit"
                                  className="btn btn-success btn-sm"
                                  title="Valider"
                                >
                                  <i className="fa fa-check"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-secondary btn-sm"
                                  onClick={() => setEditIdx(null)}
                                  title="Annuler"
                                >
                                  <i className="fa fa-times"></i>
                                </button>
                              </div>
                            </form>
                          </li>
                        ) : (
                          <li className="list-group-item d-flex justify-content-between align-items-center" key={courseIdx}>
                            <div>
                              <strong>{getModuleName(modules, course.module)}</strong>
                              <div>Heure : {course.heure}</div>
                            </div>
                            <div>
                              <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => handleEdit(dayIdx, courseIdx)}
                                title="Modifier"
                              >
                                <i className="fa fa-edit"></i>
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                title="Supprimer"
                                // onClick={() => handleDelete(dayIdx, courseIdx)} // Pas d'effet
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </li>
                        )
                      )
                  )}
                </ul>
              </div>
            </div>
          ))}
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
              <form onSubmit={handleAddCourse}>
                <div className="modal-header">
                  <h5 className="modal-title">Ajouter un cours</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAdd(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-2">
                    <label className="form-label">Jour</label>
                    <select
                      className="form-select"
                      name="day"
                      value={addData.day}
                      onChange={handleAddChange}
                      required
                    >
                      <option value="">Sélectionner un jour</option>
                      {jours.map(j => (
                        <option key={j} value={j}>{j}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Filière</label>
                    <select
                      className="form-select"
                      value={selectedFiliere}
                      onChange={e => setSelectedFiliere(e.target.value)}
                      required
                    >
                      <option value="">Sélectionner une filière</option>
                      {filieresWithCalendrier.map(f => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Module</label>
                    <select
                      className="form-select"
                      name="module"
                      value={addData.module}
                      onChange={handleAddChange}
                      required
                    >
                      <option value="">Sélectionner un module</option>
                      {filteredModules.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Heure</label>
                    <input
                      type="text"
                      className="form-control"
                      name="heure"
                      value={addData.heure}
                      onChange={handleAddChange}
                      placeholder="ex: 08:00 - 10:00"
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

export default CalendarManagement;