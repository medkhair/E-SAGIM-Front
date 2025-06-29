import { Link } from "react-router-dom";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/footer";
import { quizzs } from "../../services/data";

function ContentQuizzs({ moduleId }) {
  // Filtrer les quizzs selon l'id du module reçu en props
  const filteredQuizzs = moduleId
    ? quizzs.filter((q) => q.moduleId === moduleId)
    : quizzs;

  if (filteredQuizzs.length === 0) {
    return (
      <div className="content">
        <NavBar />
        <div className="container mt-4">
          <div className="alert alert-info text-center">
            Aucun quizz trouvé pour ce module.
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="content">
        <NavBar />
        <div className="container mt-4">
          <div className="row">
            {filteredQuizzs.map((q) => (
              <div className="col-md-4 mb-4" key={q.id}>
                <div className="card h-100 d-flex flex-column align-items-center justify-content-center text-center">
                  {/* Miniature image (replace with your own or use a placeholder) */}
                  <img
                    src={`https://via.placeholder.com/400x200?text=${encodeURIComponent(q.title)}`}
                    className="card-img-top"
                    alt={q.title}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <h5 className="card-title">{q.title}</h5>
                    <Link
                      to={`/etudiant/quizz/${q.moduleId}/${q.id}`}
                      className="btn btn-primary mt-2"
                    >
                      Commencer quizz
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ContentQuizzs;