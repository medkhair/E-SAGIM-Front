
function LastQuizzes({  }) {
  return (
    <div className="col-md-6">
        <div className="bg-light rounded p-4 h-100">
            <h5 className="mb-3">Derniers Quizz</h5>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Architecture
                    <span className="badge bg-success rounded-pill">18/30</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Bureautique
                    <span className="badge bg-success rounded-pill">10/20</span>
                </li>
            </ul>
        </div>
    </div>
  );
}

export default LastQuizzes;