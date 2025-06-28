import React, { useState } from "react";
import { quizzs } from "../../services/data";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/footer";

function Quizz({ quizzId }) {

  const quizz = quizzs.find((q) => q.id === quizzId);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!quizz) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">
          Quizz introuvable.
        </div>
      </div>
    );
  }

  const question = quizz.questions[current];

  const handleChoice = (idx) => {
    setSelected(idx);
  };

  const handleNext = () => {
    if (selected === question.answer) {
      setScore(score + 1);
    }
    if (current + 1 < quizz.questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="content">
        <NavBar />
        <div className="container mt-5">
        <h3 className="mb-4 text-center">{quizz.title}</h3>
        {!finished ? (
            <div className="card p-4">
            <h5>
                Question {current + 1} / {quizz.questions.length}
            </h5>
            <p className="mt-3">{question.question}</p>
            <div className="list-group">
                {question.choices.map((choice, idx) => (
                <button
                    key={idx}
                    className={`list-group-item list-group-item-action${selected === idx ? " active" : ""}`}
                    onClick={() => handleChoice(idx)}
                    disabled={selected !== null}
                >
                    {choice}
                </button>
                ))}
            </div>
            <button
                className="btn btn-primary mt-4"
                onClick={handleNext}
                disabled={selected === null}
            >
                {current + 1 === quizz.questions.length ? "Terminer" : "Suivant"}
            </button>
            </div>
        ) : (
            <div className="card p-4 text-center">
            <h4>Votre score : {score} / {quizz.questions.length}</h4>
            <button className="btn btn-secondary mt-3" onClick={handleRestart}>
                Recommencer le quizz
            </button>
            </div>
        )}
        </div>
        <Footer />
    </div>
  );
}

export default Quizz;