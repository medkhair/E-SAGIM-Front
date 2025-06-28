import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userImg from '../img/user.jpg';

function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    image: userImg
  });

  useEffect(() => {
    // Récupérer l'utilisateur du localStorage
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser({
          nom: parsed.nom || "",
          prenom: parsed.prenom || "",
          image: parsed.image || userImg
        });
      } catch {
        setUser({
          nom: "",
          prenom: "",
          image: userImg
        });
      }
    }
  }, []);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      document.querySelectorAll('.sidebar, .content').forEach(el => {
        el.classList.toggle('open');
      });
    };
    const togglers = document.querySelectorAll('.sidebar-toggler');
    togglers.forEach(toggler => toggler.addEventListener('click', handler));
    return () => {
      togglers.forEach(toggler => toggler.removeEventListener('click', handler));
    };
  }, []);

  useEffect(() => {
    const logoutLinks = document.querySelectorAll('.logout-link');
    const handleLogout = (e) => {
      e.preventDefault();
      localStorage.removeItem("isAuth");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/etudiant/login");
    };
    logoutLinks.forEach(link => link.addEventListener('click', handleLogout));
    return () => {
      logoutLinks.forEach(link => link.removeEventListener('click', handleLogout));
    };
  }, [navigate]);

  return (
    <>
      <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
        <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
          <h2 className="text-primary mb-0"><i className="fa fa-hashtag"></i></h2>
        </a>
        <a href="#" className="sidebar-toggler flex-shrink-0">
          <i className="fa fa-bars"></i>
        </a>
        <form className="d-none d-md-flex ms-4">
          <input className="form-control border-0" type="search" placeholder="Search"></input>
        </form>
        <div className="navbar-nav align-items-center ms-auto">
          <div className="nav-item dropdown">
            <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <img
                className="rounded-circle me-lg-2"
                src={user.img || userImg}
                alt=""
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
              <span className="d-none d-lg-inline-flex">
                {user.nom} {user.prenom}
              </span>
            </a>
            <div className="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
              <Link to="/etudiant/profile" className="dropdown-item">My Profile</Link>
              <a href="#" className="dropdown-item logout-link">Log Out</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar;