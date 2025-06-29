import NavBar from "../../layouts/NavBar";
import Greeting from "./Greeting";
import NextCourses from "./NextCourses";
import LastQuizzes from "./LastQuizzes";
import Announcement from "./Announcement";
import Footer from "../../layouts/footer";


function Content() {
  return (
    <>
        <div className="content">
            <NavBar></NavBar>
            <Greeting></Greeting>
            <div className="container-fluid pt-2 px-4">
              <div className="row g-4">
                <NextCourses></NextCourses>
                <LastQuizzes></LastQuizzes>
              </div>
            </div>
            <div className="container-fluid pt-4 px-4">
              <div className="row g-4">
                <Announcement></Announcement>
              </div>
            </div>
            <Footer></Footer>
        </div>
    </>
  );
}

export default Content;