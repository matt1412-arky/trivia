import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

type Question = {
  question: string;
  correctAnswer: string;
};

const questions: Question[] = [
  {
    question: "What is the capital of France?",
    correctAnswer: "Paris",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    correctAnswer: "Harper Lee",
  },
  {
    question: "What is the smallest planet in our solar system?",
    correctAnswer: "Mercury",
  },
  {
    question: "What is the chemical symbol for gold?",
    correctAnswer: "Au",
  },
];

function App() {
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
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
  };

  const allCorrect = answers.every(
    (answer, index) =>
      answer.trim().toLowerCase() ===
      questions[index].correctAnswer.trim().toLowerCase()
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Trivia Quiz</h1>
      {submitted && !allCorrect && (
        <div className="alert alert-danger text-center">
          <p>Some answers are incorrect:</p>
          <ul className="list-unstyled">
            {answers.map(
              (answer, index) =>
                answer.trim().toLowerCase() !==
                  questions[index].correctAnswer.trim().toLowerCase() && (
                  <li key={index}>Question {index + 1}</li>
                )
            )}
          </ul>
        </div>
      )}
      {submitted && allCorrect && (
        <div className="alert alert-success text-center mt-4">
          Congratulations! You answered all questions correctly!
        </div>
      )}
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{questions[currentQuestion].question}</h5>
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
          className="btn btn-secondary"
          onClick={handlePrev}
          disabled={currentQuestion === 0}
        >
          Prev
        </button>
        {currentQuestion === questions.length - 1 ? (
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
