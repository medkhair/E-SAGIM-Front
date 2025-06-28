import React from "react";
import { useParams } from "react-router-dom";
import SideBar from "../../layouts/SideBar";
import { modules } from "../../services/data";
import Quizz from "../../components/Etudiant/Quizz";

function QuizzPage() {
  const { quizzId } = useParams();
  const quizzIdNum = quizzId ? parseInt(quizzId, 10) : undefined;

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <SideBar modules={modules} />
      <div className="flex-grow-1">
        <Quizz quizzId={quizzIdNum} />
      </div>
    </div>
  );
}

export default QuizzPage;