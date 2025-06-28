import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/footer";
import { cours } from "../../services/data";

function ContentCourses({ moduleId }) {
 
  const filteredCourses = moduleId
    ? cours.filter((c) => c.moduleId === moduleId)
    : cours;

    if (filteredCourses.length === 0) {
        return (
            <div className="content">
                <NavBar />
                <div className="container mt-4">
                    <div className="alert alert-info text-center">
                        Aucun cours trouvé pour ce module.
                    </div>
                </div>
                <Footer />
            </div>
        );
        }else{
            return (
                    <>
                    <div className="content">
                        <NavBar />
                        <div className="container mt-4">
                        <div className="row">
                            {filteredCourses.map((c) => (
                            <div className="col-md-4 mb-4" key={c.id}>
                                <div className="card h-100 d-flex flex-column align-items-center justify-content-center text-center">
                                {/* Miniature image (replace with your own or use a placeholder) */}
                                <img
                                    src={`https://via.placeholder.com/400x200?text=${encodeURIComponent(c.title)}`}
                                    className="card-img-top"
                                    alt={c.title}
                                    style={{ objectFit: "cover", height: "200px" }}
                                />
                                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                                    <h5 className="card-title">{c.title}</h5>
                                    <button className="btn btn-primary mt-2">
                                    Voir matériel
                                    </button>
                                </div>
                                </div>
                            </div>
                            ))}
                        </div>
                        </div>
                        <Footer />
                    </div>
                    </>
                );
        }
  
}

export default ContentCourses;