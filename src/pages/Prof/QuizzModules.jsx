import SideBar from "../../layouts/SideBar";
import Content from "../../components/Prof/ContentQuizzModules";
import { modules } from '../../services/data';
import React from 'react';

function QuizzModules() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const profModules = user.role === "prof" && Array.isArray(user.modules)
        ? modules.filter(m => user.modules.includes(m.id))
        : [];
    return (
        <div className="container-xxl position-relative bg-white d-flex p-0">
            <SideBar modules={modules} />
            <Content modules={profModules} />
        </div>
    );
}

export default QuizzModules;