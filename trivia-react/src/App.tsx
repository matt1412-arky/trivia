import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { APIQuestionResponse, DataType, Question, QuestionGroup, SubmitRequestBody, SubmitResponse } from "./types";

import pk1 from "./assets/Post It-Key 1.png";
import pk2 from "./assets/Post It-Key 2.png";
import pk3 from "./assets/Post It-Key 3.png";
import pk4 from "./assets/Post It-Key 4.png";
import pk5 from "./assets/Post It-Key 5.png";

import mb1 from "./assets/Mandi Bola-1.png";
import mb2 from "./assets/Mandi Bola-2.png";
import mb3 from "./assets/Mandi Bola-3.png";
import mb4 from "./assets/Mandi Bola-4.png";
import mb5 from "./assets/Mandi Bola-5.png";

import rm from "./assets/Reverse Mirror.png";
import gtd from "./assets/Glow in The Dark.png";

const predefinedQuestionGroups: QuestionGroup[] = [
  {
    group: 1,
    questions: [
      {
        question: "What is the capital of France?",
        correctAnswer: "Paris",
        background: pk1,
      },
      {
        question: "Who wrote 'To Kill a Mockingbird'?",
        correctAnswer: "Harper Lee",
        background: mb1,
      },
      {
        question: "What is the smallest planet in our solar system?",
        correctAnswer: "Mercury",
        background: rm,
      },
      {
        question: "What is the chemical symbol for gold?",
        correctAnswer: "Au",
        background: gtd,
      },
    ],
  },
  {
    group: 2,
    questions: [
      {
        question: "What is the capital of Germany?",
        correctAnswer: "Berlin",
        background: pk2,
      },
      {
        question: "Who wrote '1984'?",
        correctAnswer: "George Orwell",
        background: mb2,
      },
      {
        question: "What is the largest planet in our solar system?",
        correctAnswer: "Jupiter",
        background: rm,
      },
      {
        question: "What is the chemical symbol for silver?",
        correctAnswer: "Ag",
        background: gtd,
      },
    ],
  },
  {
    group: 3,
    questions: [
      {
        question: "What is the capital of Japan?",
        correctAnswer: "Tokyo",
        background: pk3,
      },
      {
        question: "Who wrote 'Pride and Prejudice'?",
        correctAnswer: "Jane Austen",
        background: mb3,
      },
      {
        question: "What planet is known as the Red Planet?",
        correctAnswer: "Mars",
        background: rm,
      },
      {
        question: "What is the chemical symbol for sodium?",
        correctAnswer: "Na",
        background: gtd,
      },
    ],
  },
  {
    group: 4,
    questions: [
      {
        question: "What is the capital of Italy?",
        correctAnswer: "Rome",
        background: pk4,
      },
      {
        question: "Who wrote 'The Great Gatsby'?",
        correctAnswer: "F. Scott Fitzgerald",
        background: mb4,
      },
      {
        question: "What planet is known for its rings?",
        correctAnswer: "Saturn",
        background: rm,
      },
      {
        question: "What is the chemical symbol for potassium?",
        correctAnswer: "K",
        background: gtd,
      },
    ],
  },
  {
    group: 5,
    questions: [
      {
        question: "What is the capital of Canada?",
        correctAnswer: "Ottawa",
        background: pk5,
      },
      {
        question: "Who wrote 'Moby Dick'?",
        correctAnswer: "Herman Melville",
        background: mb5,
      },
      {
        question: "What planet is known as the Blue Planet?",
        correctAnswer: "Earth",
        background: rm,
      },
      {
        question: "What is the chemical symbol for iron?",
        correctAnswer: "Fe",
        background: gtd,
      },
    ],
  },
];

const mergeFetchedData = (data: DataType, predefined: QuestionGroup[]): QuestionGroup[] => {
  return predefined.map((group, groupIndex) => {
    const updatedQuestions = group.questions.map((question, questionIndex) => ({
      ...question,
      question: data[groupIndex][questionIndex] || question.question,
    }));

    return {
      ...group,
      questions: updatedQuestions
    };
  });
};

// Function to get question
const getQuestion = async (): Promise<DataType> => {
  const response = await fetch('http://localhost:12345/question')
  
  if (!response.ok) {
    throw new Error ('HTTP error! status: ${response.status}');
  }

  const result: APIQuestionResponse = await response.json();
  const parsedData: DataType = result.questions
  return parsedData
};

const postSubmitAnsweer = async (reqBody: SubmitRequestBody): Promise<SubmitResponse> => {
  const response = await fetch('http://localhost:12345/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody)
  });

  if(!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

function App() {
  const [selectedGroup, setSelectedGroup] = useState<number>(1);
  const [answers, setAnswers] = useState<string[]>(Array(4).fill(""));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [allQuestion, setAllQuestion] = useState<DataType>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [questionGroups, setQuestionGroups] = useState<QuestionGroup[]>(predefinedQuestionGroups);

  useEffect(() => {
    const fetchQuestion = async() => {
      console.log('Fetching data...');
      try {
        const fetchedQuestion = await getQuestion();
        console.log('Fetched Question: ', fetchedQuestion);
        setAllQuestion(fetchedQuestion);
        const mergedData = mergeFetchedData(fetchedQuestion, predefinedQuestionGroups)
        setQuestionGroups(mergedData)
      } catch (error: any) {
        console.error('Fetch Error: ', error);
      } finally {
        setLoading(false)
      }
    };

    fetchQuestion();
  }, []);

  const currentQuestions =
    questionGroups.find((group) => group.group === selectedGroup)?.questions ||
    [];

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
  };

  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newGroup = parseInt(event.target.value);
    setSelectedGroup(newGroup);
    setAnswers(Array(4).fill("")); // Reset jawaban
    setCurrentQuestion(0); // Reset pertanyaan saat ini
    setSubmitted(false); // Reset status submitted
  };

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
        <div className="container mt-5">
          <h1 className="mb-4 text-center">Trivia Quiz</h1>
          <div className="mb-3">
            <label htmlFor="groupSelect" className="form-label">
              Select Question Group
            </label>
            <select
              id="groupSelect"
              className="form-select"
              onChange={handleGroupChange}
              value={selectedGroup}
            >
              {questionGroups.map((group) => (
                <option key={group.group} value={group.group}>
                  Group {group.group}
                </option>
              ))}
            </select>
          </div>
          {submitted && !allCorrect && (
            <div className="alert alert-danger text-center">
              <p>Some answers are incorrect:</p>
              <ul className="list-unstyled">
                {answers.map(
                  (answer, index) =>
                    answer.trim().toLowerCase() !==
                      currentQuestions[index].correctAnswer
                        .trim()
                        .toLowerCase() && (
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
              className="btn btn-secondary"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
            >
              Prev
            </button>
            {currentQuestion === currentQuestions.length - 1 ? (
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
        <footer className="footer">
          <p>Developed by Panitia CAO and the Creative Space Coding Team</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
