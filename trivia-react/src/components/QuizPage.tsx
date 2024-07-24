import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "./modal/SuccessModal"; // Import your Modal component

type Question = {
  question: string;
  correctAnswer: string;
  background: string;
};

type QuestionGroup = {
  group: number;
  questions: Question[];
};

type QuizPageProps = {
  questionGroups: QuestionGroup[];
};

const QuizPage: React.FC<QuizPageProps> = ({ questionGroups }) => {
  const { group } = useParams<{ group: string }>();
  // console.log("group param:", group); // Log the group parameter
  const selectedGroup = parseInt(group || "1", 10);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(4).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(15 * 60); // Set timer
  const [showModal, setShowModal] = useState(false); // State for showing the modal

  const currentQuestions =
    questionGroups.find((g) => g.group === selectedGroup)?.questions || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(Math.abs(seconds) / 60);
    const s = Math.abs(seconds) % 60;
    return `${seconds < 0 ? "-" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (allCorrect) {
      setShowModal(true); // Show modal on success
    }
  };

  const closeModal = () => setShowModal(false);

  const allCorrect = answers.every(
    (answer, index) =>
      answer.trim().toLowerCase() ===
      currentQuestions[index].correctAnswer.trim().toLowerCase()
  );

  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(${currentQuestions[currentQuestion]?.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="overlay">
        <div className="timer">{formatTime(secondsLeft)}</div>
        <div className="container mt-5">
          <h1 className="mb-4 text-center">Trivia Quiz</h1>
          {submitted && !allCorrect && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <h4 className="alert-heading">
                Oops! Some answers are incorrect.
              </h4>
              <p>Here are the questions you missed:</p>
              <ul className="list-unstyled">
                {answers.map((answer, index) =>
                  answer.trim().toLowerCase() !==
                  currentQuestions[index].correctAnswer.trim().toLowerCase() ? (
                    <li key={index}>Question {index + 1}</li>
                  ) : null
                )}
              </ul>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setSubmitted(false)}
              ></button>
            </div>
          )}

          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">
                {currentQuestions[currentQuestion]?.question}
              </h5>
              <textarea
                className="form-control"
                rows={4}
                value={answers[currentQuestion]}
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-nav btn-prev"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
            >
              Prev
            </button>
            {currentQuestion === currentQuestions.length - 1 ? (
              <button className="btn btn-nav btn-next" onClick={handleSubmit}>
                Submit
              </button>
            ) : (
              <button className="btn btn-nav btn-next" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Render the modal */}
      <Modal
        isVisible={showModal}
        message="Congratulations! You answered all questions correctly!"
        onClose={closeModal}
      />

      {/* Footer */}
      <footer className="footer">
        <p>
          Developed by the CAO Committee in collaboration with the Creative
          Space Coding Team
        </p>
        <p>
          &copy; {new Date().getFullYear()} Creative Space Coding Team. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default QuizPage;
