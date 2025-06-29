import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/footer";
import { Link } from "react-router-dom";

function ContentModules({ modules }) {
  return (
    <div className="content">
      <NavBar />
      <div className="container mt-4">
        <div className="row">
          {modules.map((module) => (
            <div className="col-md-4 mb-4" key={module.id}>
              <div className="card h-100 d-flex flex-column align-items-center justify-content-center text-center">
                {/* Miniature image (replace with your own or use a placeholder) */}
                <img
                  src={`https://via.placeholder.com/400x200?text=${encodeURIComponent(module.name)}`}
                  className="card-img-top"
                  alt={module.name}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                  <h5 className="card-title">{module.name}</h5>
                  <Link to={`/prof/quizz/${module.id}`} className="btn btn-primary mt-2">
                    Voir Quizzs
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

export default ContentModules;