import React from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/footer";

function Annocements({ annoncements }) {
  // Trier les annoncements du plus récent au plus ancien
  const sorted = [...annoncements].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="content">
      <NavBar />
      <div className="container mt-5">
        <h3 className="mb-4 text-center">Annoncements</h3>
        <div className="row justify-content-center">
          <div className="col-md-8">
            {sorted.map((a) => (
              <div className="card mb-3" key={a.id}>
                <div className="card-body">
                  <p className="card-text">{a.message}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      {a.author.role === "admin" ? "Admin" : "Prof"} : {a.author.name}
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
    </div>
  );
}

export default Annocements;