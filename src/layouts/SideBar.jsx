import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userImg from '../img/user.jpg';

function SideBar({ modules }) {
  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    image: userImg,
    role: "etudiant",
    modules: []
  });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser({
          nom: parsed.nom || "",
          prenom: parsed.prenom || "",
          image: parsed.image || userImg,
          role: parsed.role || "etudiant",
          modules: parsed.modules || []
        });
      } catch {
        setUser({
          nom: "",
          prenom: "",
          image: userImg,
          role: "etudiant",
          modules: []
        });
      }
    }
  }, []);

  // filtrer les modules qu'ils enseignent
  const profModules = user.role === "prof" && Array.isArray(user.modules)
  ? modules.filter(m => user.modules.includes(m.id))
  : [];

    console.log("Modules for prof:", profModules);
    console.log("User role:", user.role);
  console.log("User modules:", user.modules);
  console.log("User:", user);
  return (
    <>
      <div className="sidebar pe-4 pb-3">
        <nav className="navbar bg-light navbar-light">
          <Link to="/" className="navbar-brand mx-4 mb-3">
            <h3 className="text-primary">
              <i className="fa fa-hashtag me-2"></i>E-SAGIM
            </h3>
          </Link>
          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <img
                className="rounded-circle"
                src={user.image ? user.image : userImg}
                alt=""
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
              <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
            </div>
            <div className="ms-3">
              <h6 className="mb-0">{user.nom} {user.prenom}</h6>
              <span>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
            </div>
          </div>
          <div className="navbar-nav w-100">
            {/* Etudiant */}
            {user.role === "etudiant" && (
              <>
                <Link to="/etudiant/" className="nav-item nav-link active">
                  <i className="fa fa-tachometer-alt me-2"></i>Dashboard
                </Link>
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <i className="fa fa-book me-2"></i>Cours
                  </a>
                  <div className="dropdown-menu bg-transparent border-0">
                    {modules.map((module) => (
                      <Link
                        key={module.id}
                        to={`/etudiant/cours/${module.id}`}
                        className="dropdown-item"
                      >
                        {module.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <i className="fa fa-question-circle me-2"></i>Quizz
                  </a>
                  <div className="dropdown-menu bg-transparent border-0">
                    {modules.map((module) => (
                      <Link
                        key={module.id}
                        to={`/etudiant/quizz/${module.id}`}
                        className="dropdown-item"
                      >
                        {module.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link to="/etudiant/calendrier" className="nav-item nav-link">
                  <i className="fa fa-calendar me-2"></i>Calendrier
                </Link>
                <Link to="/etudiant/announcements" className="nav-item nav-link">
                  <i className="fa fa-bullhorn me-2"></i>Annoncements
                </Link>
              </>
            )}

            {/* Prof */}
            {user.role === "prof" && (
              <>
                <Link to="/prof/" className="nav-item nav-link active">
                  <i className="fa fa-tachometer-alt me-2"></i>Dashboard
                </Link>
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <i className="fa fa-book me-2"></i>Cours
                  </a>
                  <div className="dropdown-menu bg-transparent border-0">
                    {profModules.map((module) => (
                      <Link
                        key={module.id}
                        to={`/prof/cours/${module.id}`}
                        className="dropdown-item"
                      >
                        {module.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    <i className="fa fa-question-circle me-2"></i>Quizz
                  </a>
                  <div className="dropdown-menu bg-transparent border-0">
                    {profModules.map((module) => (
                      <Link
                        key={module.id}
                        to={`/prof/quizz/${module.id}`}
                        className="dropdown-item"
                      >
                        {module.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link to="/prof/calendrier" className="nav-item nav-link">
                  <i className="fa fa-calendar me-2"></i>Calendrier
                </Link>
                <Link to="/prof/announcements" className="nav-item nav-link">
                  <i className="fa fa-bullhorn me-2"></i>Annoncements
                </Link>
              </>
            )}

            {/* Admin */}
            {user.role === "admin" && (
              <>
                <Link to="/admin/" className="nav-item nav-link active">
                  <i className="fa fa-tachometer-alt me-2"></i>Dashboard
                </Link>
                <Link to="/admin/utilisateurs" className="nav-item nav-link">
                  <i className="fa fa-users me-2"></i>Utilisateurs
                </Link>
                <Link to="/admin/modules" className="nav-item nav-link">
                  <i className="fa fa-book me-2"></i>Modules
                </Link>
                <Link to="/admin/filieres" className="nav-item nav-link">
                  <i className="fa fa-graduation-cap me-2"></i>Filieres
                </Link>
                <Link to="/admin/calendrier" className="nav-item nav-link">
                  <i className="fa fa-calendar me-2"></i>Calendrier
                </Link>
                <Link to="/admin/announcements" className="nav-item nav-link">
                  <i className="fa fa-bullhorn me-2"></i>Annoncements
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}

export default SideBar;