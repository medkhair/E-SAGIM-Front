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


// Prof pages (à créer si besoin)

import HomeProf from './pages/Prof/Home.jsx';
import LoginProf from './pages/Prof/Login.jsx';
import ModulesProf from './pages/Prof/Modules.jsx';
import CoursesProf from './pages/Prof/Courses.jsx';
import QuizzsProf from './pages/Prof/Quizzs.jsx';
import QuizzModulesProf from './pages/Prof/QuizzModules.jsx';
import CalendarPageProf from './pages/Prof/CalendarPage.jsx';
import AnnoncementsPageProf from './pages/Prof/AnnoncementsPage.jsx';

/*
// Prof pages (à créer si besoin)
import ProfCourses from './pages/Prof/Courses.jsx';
import ProfQuizzs from './pages/Prof/Quizzs.jsx';
import ProfCalendarPage from './pages/Prof/CalendarPage.jsx';
import ProfAnnoncementsPage from './pages/Prof/AnnoncementsPage.jsx';

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
                  {/* Ajouter d'autres routes pour les pages du professeur ici */}
                  {/* <Route path="cours" element={<ProfCourses />} />
                  <Route path="quizz" element={<ProfQuizzs />} />
                  <Route path="calendrier" element={<ProfCalendarPage />} />
                  <Route path="announcements" element={<ProfAnnoncementsPage />} /> */}   
                </Routes>
              </RequireAuth>
            }
          />
          

          {/* Prof 
          <Route
            path="/prof/*"
            element={
              <RequireAuth>
                <Routes>
                  <Route path="/" element={<ProfCourses />} />
                  <Route path="cours" element={<ProfCourses />} />
                  <Route path="quizz" element={<ProfQuizzs />} />
                  <Route path="calendrier" element={<ProfCalendarPage />} />
                  <Route path="announcements" element={<ProfAnnoncementsPage />} />
                  <Route path="*" element={<ProfCourses />} />
                </Routes>
              </RequireAuth>
            }
          />
            */}
          {/* Admin 
          <Route
            path="/admin/*"
            element={
              <RequireAuth>
                <Routes>
                  <Route path="/" element={<AdminUtilisateurs />} />
                  <Route path="utilisateurs" element={<AdminUtilisateurs />} />
                  <Route path="modules" element={<AdminModules />} />
                  <Route path="filieres" element={<AdminFilieres />} />
                  <Route path="calendrier" element={<AdminCalendarPage />} />
                  <Route path="announcements" element={<AdminAnnoncementsPage />} />
                  <Route path="*" element={<AdminUtilisateurs />} />
                </Routes>
              </RequireAuth>
            }
          />
              */}
          {/* Redirection dynamique selon le rôle */}
          <Route path="*" element={<RoleRedirect />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;