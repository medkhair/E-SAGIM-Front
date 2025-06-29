import { Link } from "react-router-dom";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/footer";
import { quizzs, modules, studentsResults } from "../../services/data"; // Ajoute studentsResults dans ton data.js si besoin
import React, { useState } from "react";

function ContentQuizzs({ moduleId }) {
  const [showModal, setShowModal] = useState(false);
  const [questions, setQuestions] = useState([
    {
      question: "",
      answers: ["", "", "", ""],
      correct: 0,
      answerCount: 4
    }
  ]);
  const [newQuizzTitle, setNewQuizzTitle] = useState("");
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedQuizz, setSelectedQuizz] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editQuizz, setEditQuizz] = useState(null);
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  const [studentsForQuizz, setStudentsForQuizz] = useState([]);

  // Trouver le nom du module si moduleId est fourni
  const moduleTitle = moduleId
    ? modules.find((m) => m.id === moduleId)?.name
    : null;

  // Filtrer les quizzs selon l'id du module reçu en props
  const filteredQuizzs = moduleId
    ? quizzs.filter((q) => q.moduleId === moduleId)
    : quizzs;

  // Ajout du quizz (ici, juste console.log, à adapter pour un vrai backend)
  const handleAddQuizz = (e) => {
    e.preventDefault();
    console.log("Nouveau quizz ajouté :", {
      moduleId,
      title: newQuizzTitle,
      questions
    });
    setShowModal(false);
    setNewQuizzTitle("");
    setQuestions([
      {
        question: "",
        answers: ["", "", "", ""],
        correct: 0,
        answerCount: 4
      }
    ]);
  };

  // Gérer le changement du nombre de réponses pour une question
  const handleAnswerCountChange = (qIdx, count) => {
    setQuestions(prev =>
      prev.map((q, idx) =>
        idx === qIdx
          ? {
              ...q,
              answerCount: count,
              answers: Array(count)
                .fill("")
                .map((_, i) => q.answers[i] || ""),
              correct: 0
            }
          : q
      )
    );
  };

  // Ajouter une nouvelle question
  const handleAddQuestion = () => {
    setQuestions(prev => [
      ...prev,
      {
        question: "",
        answers: ["", "", "", ""],
        correct: 0,
        answerCount: 4
      }
    ]);
  };

  // Modifier une question, une réponse ou la bonne réponse
  const handleQuestionChange = (qIdx, value) => {
    setQuestions(prev =>
      prev.map((q, idx) =>
        idx === qIdx ? { ...q, question: value } : q
      )
    );
  };

  const handleAnswerChange = (qIdx, aIdx, value) => {
    setQuestions(prev =>
      prev.map((q, idx) =>
        idx === qIdx
          ? {
              ...q,
              answers: q.answers.map((a, i) =>
                i === aIdx ? value : a
              )
            }
          : q
      )
    );
  };

  const handleCorrectChange = (qIdx, aIdx) => {
    setQuestions(prev =>
      prev.map((q, idx) =>
        idx === qIdx ? { ...q, correct: aIdx } : q
      )
    );
  };

  // Afficher le quizz dans un popup
  const handleViewQuizz = (quizz) => {
    setSelectedQuizz(quizz);
    setShowViewModal(true);
  };

  // Ouvre le modal d'édition avec le quizz sélectionné
  const handleEditQuizz = (quizz) => {
    setEditQuizz({
      ...quizz,
      questions: (quizz.questions || []).map(q => ({
        ...q,
        answers: q.answers || q.choices || [],
        correct: q.correct !== undefined ? q.correct : q.answer,
        answerCount: (q.answers || q.choices || []).length
      }))
    });
    setShowEditModal(true);
  };

  // Gère la modification d'une question dans le quizz à éditer
  const handleEditQuestionChange = (qIdx, value) => {
    setEditQuizz(prev => ({
      ...prev,
      questions: prev.questions.map((q, idx) =>
        idx === qIdx ? { ...q, question: value } : q
      )
    }));
  };

  const handleEditAnswerChange = (qIdx, aIdx, value) => {
    setEditQuizz(prev => ({
      ...prev,
      questions: prev.questions.map((q, idx) =>
        idx === qIdx
          ? {
              ...q,
              answers: q.answers.map((a, i) => (i === aIdx ? value : a))
            }
          : q
      )
    }));
  };

  const handleEditCorrectChange = (qIdx, aIdx) => {
    setEditQuizz(prev => ({
      ...prev,
      questions: prev.questions.map((q, idx) =>
        idx === qIdx ? { ...q, correct: aIdx } : q
      )
    }));
  };

  const handleEditAnswerCountChange = (qIdx, count) => {
    setEditQuizz(prev => ({
      ...prev,
      questions: prev.questions.map((q, idx) =>
        idx === qIdx
          ? {
              ...q,
              answerCount: count,
              answers: Array(count)
                .fill("")
                .map((_, i) => q.answers[i] || ""),
              correct: 0
            }
          : q
      )
    }));
  };

  const handleEditAddQuestion = () => {
    setEditQuizz(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: "",
          answers: ["", "", "", ""],
          correct: 0,
          answerCount: 4
        }
      ]
    }));
  };

  const handleEditRemoveQuestion = (qIdx) => {
    setEditQuizz(prev => ({
      ...prev,
      questions: prev.questions.filter((_, idx) => idx !== qIdx)
    }));
  };

  // Soumission de l'édition (ici, juste console.log)
  const handleEditQuizzSubmit = (e) => {
    e.preventDefault();
    console.log("Quizz édité :", editQuizz);
    setShowEditModal(false);
    setEditQuizz(null);
  };

  // Afficher les étudiants et leurs scores pour un quizz
  const handleShowStudents = (quizz) => {
    // Exemple : adapte selon ta structure de données
    // studentsResults doit être un tableau [{quizzId, studentName, score}]
    const results = (studentsResults || []).filter(r => r.quizzId === quizz.id);
    setStudentsForQuizz(results);
    setShowStudentsModal(true);
  };

  return (
    <div className="content">
      <NavBar />
      <div className="container mt-4">
        {moduleTitle && (
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>{moduleTitle}</h3>
            <button className="btn btn-success" onClick={() => setShowModal(true)}>
              Ajouter quizz
            </button>
          </div>
        )}
        {filteredQuizzs.length === 0 ? (
          <div className="alert alert-info text-center">
            Aucun quizz trouvé pour ce module.
          </div>
        ) : (
          <div className="row">
            {filteredQuizzs.map((q) => (
              <div className="col-md-4 mb-4" key={q.id}>
                <div className="card h-100 d-flex flex-column align-items-center justify-content-center text-center">
                  <img
                    src={`https://via.placeholder.com/400x200?text=${encodeURIComponent(q.title)}`}
                    className="card-img-top"
                    alt={q.title}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <h5 className="card-title">{q.title}</h5>
                    <div className="d-flex gap-2 mt-2">
                      <button
                        className="btn btn-primary"
                        title="Voir quizz"
                        onClick={() => handleViewQuizz(q)}
                      >
                        <i className="fa fa-eye"></i>
                      </button>
                      <button
                        className="btn btn-warning"
                        title="Modifier quizz"
                        onClick={() => handleEditQuizz(q)}
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button className="btn btn-danger" title="Supprimer quizz">
                        <i className="fa fa-trash"></i>
                      </button>
                      <button
                        className="btn btn-success"
                        title="Voir les étudiants"
                        onClick={() => handleShowStudents(q)}
                      >
                        <i className="fa fa-user-graduate"></i>
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

      {/* Modal d'affichage du quizz */}
      {showViewModal && selectedQuizz && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.5)"
          }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content" style={{ maxHeight: "90vh", overflowY: "auto" }}>
              <div className="modal-header">
                <h5 className="modal-title">{selectedQuizz.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowViewModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {(selectedQuizz.questions || []).map((q, idx) => (
                  <div key={idx} className="mb-4">
                    <div className="fw-bold mb-2">
                      Question {idx + 1}: {q.question}
                    </div>
                    <ul className="list-group">
                      {(q.answers || q.choices || []).map((ans, aIdx) => (
                        <li
                          key={aIdx}
                          className={
                            "list-group-item" +
                            ((q.correct === aIdx || q.answer === aIdx) ? " list-group-item-success" : "")
                          }
                        >
                          <span className="fw-bold">{String.fromCharCode(65 + aIdx)}.</span> {ans}
                          {(q.correct === aIdx || q.answer === aIdx) && (
                            <span className="badge bg-success ms-2">Bonne réponse</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowViewModal(false)}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'ajout de quizz multi-questions */}
      {showModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.5)"
          }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content" style={{ maxHeight: "90vh", overflowY: "auto" }}>
              <form onSubmit={handleAddQuizz}>
                <div className="modal-header">
                  <h5 className="modal-title">Ajouter un quizz</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Titre du quizz</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newQuizzTitle}
                      onChange={e => setNewQuizzTitle(e.target.value)}
                      required
                    />
                  </div>
                  {questions.map((q, qIdx) => (
                    <div key={qIdx} className="border rounded p-3 mb-3 position-relative">
                      <div className="mb-2 fw-bold d-flex justify-content-between align-items-center">
                        <span>Question {qIdx + 1}</span>
                        {questions.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            title="Supprimer cette question"
                            onClick={() => {
                              setQuestions(prev => prev.filter((_, idx) => idx !== qIdx));
                            }}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        )}
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Intitulé de la question</label>
                        <input
                          type="text"
                          className="form-control"
                          value={q.question}
                          onChange={e => handleQuestionChange(qIdx, e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Nombre de réponses</label>
                        <select
                          className="form-select"
                          value={q.answerCount}
                          onChange={e => handleAnswerCountChange(qIdx, parseInt(e.target.value, 10))}
                        >
                          {[2, 3, 4, 5, 6].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Réponses</label>
                        {q.answers.map((ans, aIdx) => (
                          <div className="input-group mb-2" key={aIdx}>
                            <span className="input-group-text">{String.fromCharCode(65 + aIdx)}</span>
                            <input
                              type="text"
                              className="form-control"
                              value={ans}
                              onChange={e => handleAnswerChange(qIdx, aIdx, e.target.value)}
                              required
                            />
                            <div className="input-group-text">
                              <input
                                type="radio"
                                name={`correct-${qIdx}`}
                                checked={q.correct === aIdx}
                                onChange={() => handleCorrectChange(qIdx, aIdx)}
                                title="Bonne réponse"
                              />
                            </div>
                          </div>
                        ))}
                        <small className="text-muted">Cochez la bonne réponse.</small>
                      </div>
                    </div>
                  ))}
                  <div className="mb-3 text-end">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={handleAddQuestion}
                    >
                      <i className="fa fa-plus"></i> Ajouter une autre question
                    </button>
                  </div>
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

      {/* Modal d'édition de quizz */}
      {showEditModal && editQuizz && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.5)"
          }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content" style={{ maxHeight: "90vh", overflowY: "auto" }}>
              <form onSubmit={handleEditQuizzSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Modifier le quizz</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Titre du quizz</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editQuizz.title}
                      onChange={e => setEditQuizz(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  {editQuizz.questions.map((q, qIdx) => (
                    <div key={qIdx} className="border rounded p-3 mb-3 position-relative">
                      <div className="mb-2 fw-bold d-flex justify-content-between align-items-center">
                        <span>Question {qIdx + 1}</span>
                        {editQuizz.questions.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-sm btn-danger"
                            title="Supprimer cette question"
                            onClick={() => handleEditRemoveQuestion(qIdx)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        )}
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Intitulé de la question</label>
                        <input
                          type="text"
                          className="form-control"
                          value={q.question}
                          onChange={e => handleEditQuestionChange(qIdx, e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Nombre de réponses</label>
                        <select
                          className="form-select"
                          value={q.answerCount}
                          onChange={e => handleEditAnswerCountChange(qIdx, parseInt(e.target.value, 10))}
                        >
                          {[2, 3, 4, 5, 6].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Réponses</label>
                        {q.answers.map((ans, aIdx) => (
                          <div className="input-group mb-2" key={aIdx}>
                            <span className="input-group-text">{String.fromCharCode(65 + aIdx)}</span>
                            <input
                              type="text"
                              className="form-control"
                              value={ans}
                              onChange={e => handleEditAnswerChange(qIdx, aIdx, e.target.value)}
                              required
                            />
                            <div className="input-group-text">
                              <input
                                type="radio"
                                name={`edit-correct-${qIdx}`}
                                checked={q.correct === aIdx}
                                onChange={() => handleEditCorrectChange(qIdx, aIdx)}
                                title="Bonne réponse"
                              />
                            </div>
                          </div>
                        ))}
                        <small className="text-muted">Cochez la bonne réponse.</small>
                      </div>
                    </div>
                  ))}
                  <div className="mb-3 text-end">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={handleEditAddQuestion}
                    >
                      <i className="fa fa-plus"></i> Ajouter une autre question
                    </button>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-success">
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal des étudiants et scores */}
      {showStudentsModal && (
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
              <div className="modal-header">
                <h5 className="modal-title">Étudiants et scores</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowStudentsModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {studentsForQuizz.length === 0 ? (
                  <div className="text-center text-muted">Aucun résultat pour ce quizz.</div>
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Étudiant</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentsForQuizz.map((s, idx) => (
                        <tr key={idx}>
                          <td>{s.studentName}</td>
                          <td>{s.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowStudentsModal(false)}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentQuizzs;

/*
Exemple à ajouter dans data.js :
export const studentsResults = [
  { quizzId: 1, studentName: "Ali", score: 8 },
  { quizzId: 1, studentName: "Sara", score: 10 },
  { quizzId: 2, studentName: "Yasmine", score: 7 }
];
*/