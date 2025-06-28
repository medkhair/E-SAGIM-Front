
function NextCourses({  }) {
  return (
    <div className="col-md-6">
        <div className="bg-light rounded p-4 h-100">
            <h5 className="mb-3">Prochain cours</h5>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Algorithmique
                    <span className="badge bg-primary rounded-pill">9:00 am</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Français
                    <span className="badge bg-primary rounded-pill">11:00 am</span>
                </li>
            </ul>
        </div>
    </div>
  );
}

export default NextCourses;