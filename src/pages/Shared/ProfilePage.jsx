import React from "react";
import SideBar from "../../layouts/SideBar";
import Profile from "../../components/Shared/Profile";
import { modules, etudiant } from "../../services/data";

function ProfilePage() {
  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <SideBar modules={modules} />
      <Profile />
    </div>
  );
}

export default ProfilePage;