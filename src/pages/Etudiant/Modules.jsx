import SideBar from "../../layouts/SideBar";
import Content from "../../components/Etudiant/ContentModules";
import { modules } from '../../services/data';
import React from 'react';

function Modules() {

    return (
        <div className="container-xxl position-relative bg-white d-flex p-0">
            <SideBar modules={modules} />
            <Content modules={modules} />
        </div>
    );
}

export default Modules;