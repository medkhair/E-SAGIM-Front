import React from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/footer";
import { useNavigate } from "react-router-dom";

function Users() {
  const navigate = useNavigate();

  return (
    <div className="content">
      <NavBar />
      <div className="container mt-5">
        <h3 className="mb-4 text-center">Gestion des utilisateurs</h3>
        <div className="row justify-content-center">
          <div className="col-md-5 mb-4">
            <div className="card h-100 text-center">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <i className="fa fa-users fa-3x mb-3 text-primary"></i>
                <h5 className="card-title mb-3">Gérer les étudiants</h5>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/admin/etudiants")}
                >
                  Gérer étudiants
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-5 mb-4">
            <div className="card h-100 text-center">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <i className="fa fa-chalkboard-teacher fa-3x mb-3 text-success"></i>
                <h5 className="card-title mb-3">Gérer les professeurs</h5>
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/admin/profs")}
                >
                  Gérer profs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Users;