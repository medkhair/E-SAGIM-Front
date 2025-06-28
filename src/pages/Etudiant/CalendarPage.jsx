import SideBar from "../../layouts/SideBar";
import Calendar from "../../components/Etudiant/Calendar";
import { modules, calendrier } from "../../services/data";
import React from "react";

function CalendarPage() {
  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <SideBar modules={modules} />
      <Calendar calendrier={calendrier} modules={modules} />
    </div>
  );
}

export default CalendarPage;