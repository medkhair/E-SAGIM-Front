import SideBar from "../../layouts/SideBar";
import Content from "../../components/Prof/ContentCourses";
import { modules } from '../../services/data';
import React from 'react';
import { useParams } from 'react-router-dom';

function Courses() {
    const { moduleId } = useParams();

    const moduleIdNum = moduleId ? parseInt(moduleId, 10) : undefined;

    return (
        <div className="container-xxl position-relative bg-white d-flex p-0">
            <SideBar modules={modules} />
            <Content moduleId={moduleIdNum} />
        </div>
    );
}

export default Courses;