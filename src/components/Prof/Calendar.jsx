import React from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/footer";

// Récupère le nom du module par son id
function getModuleName(modules, moduleId) {
  const module = modules.find((m) => m.id === moduleId);
  return module ? module.name : "Inconnu";
}

function Calendar({ calendrier, modules }) {
  // Récupère le prof connecté et ses modules
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const profModules = user.role === "prof" && Array.isArray(user.modules) ? user.modules : [];

  // Filtre les cours pour n'afficher que ceux du prof
  const filteredCalendrier = calendrier.map(day => ({
    ...day,
    courses: day.courses.filter(course => profModules.includes(course.module))
  }));

  return (
    <div className="content">
      <NavBar />
      <div className="container mt-5">
        <h3 className="mb-4 text-center">Mon calendrier de la semaine</h3>
        <div className="row">
          {filteredCalendrier.map((day, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
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
                    day.courses.map((course, i) => (
                      <li className="list-group-item" key={i}>
                        <div>
                          <strong>{getModuleName(modules, course.module)}</strong>
                        </div>
                        <div>Heure : {course.heure}</div>
                        <div>Salle : {course.salle}</div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Calendar;