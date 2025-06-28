import React from "react";
import SideBar from "../../layouts/SideBar";
import Profile from "../../components/Etudiant/Profile";
import { modules, etudiant } from "../../services/data";

function ProfilePage() {
  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <SideBar modules={modules} />
      <Profile etudiantId={1} />
    </div>
  );
}

export default ProfilePage;