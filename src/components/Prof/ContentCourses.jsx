import React, { useState } from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/footer";
import { cours, modules } from "../../services/data";

function ContentCourses({ moduleId }) {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    materialType: "pdf",
    material: ""
  });
  const [editCourse, setEditCourse] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPath, setPdfPath] = useState("");
  const [editPdfFile, setEditPdfFile] = useState(null);
  const [editPdfPath, setEditPdfPath] = useState("");

  const filteredCourses = moduleId
    ? cours.filter((c) => c.moduleId === moduleId)
    : cours;

  const moduleTitle = moduleId
    ? modules.find((m) => m.id === moduleId)?.name
    : null;

  // Ajout du cours
  const handleAddCourse = (e) => {
    e.preventDefault();
    let materialValue = newCourse.materialType === "pdf" ? pdfPath : newCourse.material;
    console.log("Nouveau cours ajouté :", {
      moduleId,
      ...newCourse,
      material: materialValue
    });
    setShowModal(false);
    setNewCourse({ title: "", materialType: "pdf", material: "" });
    setPdfFile(null);
    setPdfPath("");
  };

  // Préparation de l'édition
  const handleEditClick = (course) => {
    setEditCourse(course);
    setEditPdfFile(null);
    setEditPdfPath(course.materialType === "pdf" ? course.material : "");
    setShowEditModal(true);
  };

  // Edition du cours
  const handleEditCourse = (e) => {
    e.preventDefault();
    let materialValue = editCourse.materialType === "pdf" ? editPdfPath : editCourse.material;
    console.log("Cours modifié :", {
      ...editCourse,
      material: materialValue
    });
    setShowEditModal(false);
    setEditCourse(null);
    setEditPdfFile(null);
    setEditPdfPath("");
  };

  // Gestion du fichier PDF sélectionné (ajout)
  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
    if (file) {
      setPdfPath("/uploads/" + file.name);
    } else {
      setPdfPath("");
    }
  };

  // Gestion du fichier PDF sélectionné (édition)
  const handleEditPdfChange = (e) => {
    const file = e.target.files[0];
    setEditPdfFile(file);
    if (file) {
      setEditPdfPath("/uploads/" + file.name);
    } else {
      setEditPdfPath("");
    }
  };

  return (
    <>
      <div className="content">
        <NavBar />
        <div className="container mt-4">
          {moduleTitle && (
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>{moduleTitle}</h3>
              <button className="btn btn-success" onClick={() => setShowModal(true)}>
                Ajouter cours
              </button>
            </div>
          )}
          {filteredCourses.length === 0 ? (
            <div className="alert alert-info text-center">
              Aucun cours trouvé pour ce module.
            </div>
          ) : (
            <div className="row">
              {filteredCourses.map((c) => (
                <div className="col-md-4 mb-4" key={c.id}>
                  <div className="card h-100 d-flex flex-column align-items-center justify-content-center text-center">
                    <img
                      src={`https://via.placeholder.com/400x200?text=${encodeURIComponent(c.title)}`}
                      className="card-img-top"
                      alt={c.title}
                      style={{ objectFit: "cover", height: "200px" }}
                    />
                    <div className="card-body d-flex flex-column align-items-center justify-content-center">
                      <h5 className="card-title">{c.title}</h5>
                      <div className="d-flex gap-2 mt-2">
                        <button className="btn btn-primary" title="Voir matériel">
                          <i className="fa fa-eye"></i>
                        </button>
                        <button
                          className="btn btn-warning"
                          title="Modifier matériel"
                          onClick={() => handleEditClick(c)}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button className="btn btn-danger" title="Supprimer cours">
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>

      {/* Modal d'ajout de cours */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.5)"
          }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleAddCourse}>
                <div className="modal-header">
                  <h5 className="modal-title">Ajouter un cours</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Titre du cours</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newCourse.title}
                      onChange={e =>
                        setNewCourse({ ...newCourse, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Type de matériel</label>
                    <select
                      className="form-select"
                      value={newCourse.materialType}
                      onChange={e => {
                        setNewCourse({ ...newCourse, materialType: e.target.value, material: "" });
                        setPdfFile(null);
                        setPdfPath("");
                      }}
                    >
                      <option value="pdf">PDF</option>
                      <option value="link">Lien</option>
                    </select>
                  </div>
                  {newCourse.materialType === "pdf" ? (
                    <div className="mb-3">
                      <label className="form-label">Sélectionner un PDF</label>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="form-control"
                        onChange={handlePdfChange}
                        required
                      />
                      {pdfFile && (
                        <div className="mt-2">
                          <span className="text-success">PDF sélectionné : {pdfFile.name}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mb-3">
                      <label className="form-label">Lien du matériel</label>
                      <input
                        type="url"
                        className="form-control"
                        value={newCourse.material}
                        onChange={e =>
                          setNewCourse({ ...newCourse, material: e.target.value })
                        }
                        placeholder="https://exemple.com"
                        required
                      />
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
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

      {/* Modal d'édition de cours */}
      {showEditModal && editCourse && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.5)"
          }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleEditCourse}>
                <div className="modal-header">
                  <h5 className="modal-title">Modifier le cours</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Titre du cours</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editCourse.title}
                      onChange={e =>
                        setEditCourse({ ...editCourse, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Type de matériel</label>
                    <select
                      className="form-select"
                      value={editCourse.materialType}
                      onChange={e => {
                        setEditCourse({ ...editCourse, materialType: e.target.value, material: "" });
                        setEditPdfFile(null);
                        setEditPdfPath("");
                      }}
                    >
                      <option value="pdf">PDF</option>
                      <option value="link">Lien</option>
                    </select>
                  </div>
                  {editCourse.materialType === "pdf" ? (
                    <div className="mb-3">
                      <label className="form-label">Sélectionner un PDF</label>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="form-control"
                        onChange={handleEditPdfChange}
                      />
                      {editPdfFile && (
                        <div className="mt-2">
                          <span className="text-success">PDF sélectionné : {editPdfFile.name}</span>
                        </div>
                      )}
                      {!editPdfFile && editPdfPath && (
                        <div className="mt-2">
                          <span className="text-info">PDF actuel : {editPdfPath.split("/").pop()}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mb-3">
                      <label className="form-label">Lien du matériel</label>
                      <input
                        type="url"
                        className="form-control"
                        value={editCourse.material}
                        onChange={e =>
                          setEditCourse({ ...editCourse, material: e.target.value })
                        }
                        placeholder="https://exemple.com"
                        required
                      />
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-warning">
                    Modifier
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ContentCourses;