import React from "react";
import SideBar from "../../layouts/SideBar";
import Annocements from "../../components/Admin/Annocements";
import { modules, annoncements } from "../../services/data";

function AnnoncementsPage() {
  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <SideBar modules={modules} />
      <Annocements annoncements={annoncements} />
    </div>
  );
}

export default AnnoncementsPage;