import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Etudiant/Home.jsx';
import Courses from './pages/Etudiant/Courses.jsx';
import Modules from './pages/Etudiant/Modules.jsx';
import Quizzs from './pages/Etudiant/Quizzs.jsx';
import QuizzModules from './pages/Etudiant/QuizzModules.jsx';
import QuizzPage from './pages/Etudiant/QuizzPage.jsx';
import CalendarPage from './pages/Etudiant/CalendarPage.jsx';
import AnnoncementsPage from './pages/Etudiant/AnnoncementsPage.jsx';
import ProfilePage from './pages/Shared/ProfilePage.jsx';
import Login from './pages/Etudiant/Login.jsx';


// Prof pages

import HomeProf from './pages/Prof/Home.jsx';
import LoginProf from './pages/Prof/Login.jsx';
import ModulesProf from './pages/Prof/Modules.jsx';
import CoursesProf from './pages/Prof/Courses.jsx';
import QuizzsProf from './pages/Prof/Quizzs.jsx';
import QuizzModulesProf from './pages/Prof/QuizzModules.jsx';
import CalendarPageProf from './pages/Prof/CalendarPage.jsx';
import AnnoncementsPageProf from './pages/Prof/AnnoncementsPage.jsx';


// Admin
import LoginAdmin from './pages/Admin/Login.jsx';
import HomeAdmin from './pages/Admin/Home.jsx';
import UsersPage from './pages/Admin/UsersPage.jsx';
import StudentsManagementPage from './pages/Admin/StudentsManagementPage.jsx';
import ProfsManagementPage from './pages/Admin/ProfsManagementPage.jsx';
import ModulesManagement from './pages/Admin/ModulesManagementPage.jsx';
import BranchesManagementPage from './pages/Admin/BranchesManagementPage.jsx';
import CalendarManagement from './pages/Admin/CalendarManagementPage.jsx';
import AnnoncementsPageAdmin from './pages/Admin/AnnoncementsPage.jsx';


/*

// Admin pages (à créer si besoin)
import AdminUtilisateurs from './pages/Admin/Utilisateurs.jsx';
import AdminModules from './pages/Admin/Modules.jsx';
import AdminFilieres from './pages/Admin/Filieres.jsx';
import AdminCalendarPage from './pages/Admin/CalendarPage.jsx';
import AdminAnnoncementsPage from './pages/Admin/AnnoncementsPage.jsx';
*/


function RequireAuth({ children, allowedRoles }) {
  const location = useLocation();
  const isAuth = localStorage.getItem("isAuth") === "true";
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!isAuth) {
    
    if (allowedRoles && allowedRoles.includes("prof")) {
      return <Navigate to="/prof/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && allowedRoles.includes("admin")) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    
    return <Navigate to="/etudiant/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "prof") return <Navigate to="/prof/" replace />;
    if (user.role === "admin") return <Navigate to="/admin/" replace />;
    return <Navigate to="/etudiant/" replace />;
  }

  return children;
}



// Redirection dynamique selon le rôle
function RoleRedirect() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.role === "prof") return <Navigate to="/prof/" replace />;
  if (user.role === "admin") return <Navigate to="/admin/" replace />;
  return <Navigate to="/etudiant/" replace />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Login */}
          <Route path="/etudiant/login" element={<Login />} />
          <Route path="/prof/login" element={<LoginProf />} />
          <Route path="/admin/login" element={<LoginAdmin />} />
          {/* Etudiant */}
          <Route
            path="/etudiant/*"
            element={
              <RequireAuth>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cours/:moduleId" element={<Courses />} />
                  <Route path="/cours/" element={<Modules />} />
                  <Route path="/quizz/:moduleId" element={<Quizzs />} />
                  <Route path="/quizz/" element={<QuizzModules />} />
                  <Route path="/quizz/:moduleId/:quizzId" element={<QuizzPage />} />
                  <Route path="/calendrier" element={<CalendarPage />} />
                  <Route path="/announcements" element={<AnnoncementsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </RequireAuth>
            }
          />
          {/* Prof */}
          <Route
            path="/prof/*"
            element={
              <RequireAuth allowedRoles={["prof"]}>
                <Routes>
                  <Route path="/" element={<HomeProf />} />
                  <Route path="/cours/" element={<ModulesProf />} />
                  <Route path="/cours/:moduleId" element={<CoursesProf/>} />
                  <Route path="/quizz/:moduleId" element={<QuizzsProf />} />
                  <Route path="/quizz/" element={<QuizzModulesProf />} />
                  <Route path="/calendrier" element={<CalendarPageProf />} />
                  <Route path="/announcements" element={<AnnoncementsPageProf />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<HomeProf />} />   
                </Routes>
              </RequireAuth>
            }
          />
          {/* Admin */}

          <Route
            path="/admin/*"
            element={
              <RequireAuth allowedRoles={["admin"]}>
                <Routes>
                  <Route path="/" element={<HomeAdmin />} />
                  <Route path="/utilisateurs" element={<UsersPage />} />
                  <Route path="/etudiants" element={<StudentsManagementPage />} />
                  <Route path="/profs" element={<ProfsManagementPage />} />
                  <Route path="/modules" element={<ModulesManagement />} />
                  <Route path="/filieres" element={<BranchesManagementPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/calendrier" element={<CalendarManagement />} />
                  <Route path="/announcements" element={<AnnoncementsPageAdmin />} />
                  <Route path="*" element={<HomeAdmin />} />
                </Routes>
              </RequireAuth>
            }
          />
          <Route path="*" element={<RoleRedirect />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;