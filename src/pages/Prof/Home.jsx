import SideBar from "../../layouts/SideBar";
import Content from "../../components/Prof/ContentHome";
import { modules } from '../../services/data';


function Home() {
    return (
        <>
        <div className="container-xxl position-relative bg-white d-flex p-0">
            <SideBar modules={modules} />
            <Content></Content>
        </div>
        </>
    )
}

export default Home;
