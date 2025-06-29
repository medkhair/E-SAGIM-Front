import Content from "../../components/Admin/ProfsManagement";
import SideBar from "../../layouts/SideBar";
import { modules } from '../../services/data';  

function UsersPage() {
    return (
        <>
        <div className="container-xxl position-relative bg-white d-flex p-0">
            <SideBar modules={modules} />
            <Content></Content>
        </div>
        </>
    )
}

export default UsersPage;