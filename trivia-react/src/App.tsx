import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { APIQuestionResponse, DataType, QuestionGroup } from "./types";

import GroupConfirmModal from "./components/modal/GroupConfirmModal";

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

import Home from "./components/Home";
import QuizPage from "./components/QuizPage";
import SecretCode from "./components/SecretCode";

const groupName = ["Uno", "Dos", "Tres", "Cuatro", "Cinco"];
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
        background: rm,
      },
      {
        question: "What is the smallest planet in our solar system?",
        correctAnswer: "Mercury",
        background: mb1,
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
        background: rm,
      },
      {
        question: "Who wrote '1984'?",
        correctAnswer: "George Orwell",
        background: mb2,
      },
      {
        question: "What is the largest planet in our solar system?",
        correctAnswer: "Jupiter",
        background: pk2,
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
        background: mb3,
      },
      {
        question: "Who wrote 'Pride and Prejudice'?",
        correctAnswer: "Jane Austen",
        background: pk3,
      },
      {
        question: "What planet is known as the Red Planet?",
        correctAnswer: "Mars",
        background: gtd,
      },
      {
        question: "What is the chemical symbol for sodium?",
        correctAnswer: "Na",
        background: rm,
      },
    ],
  },
  {
    group: 4,
    questions: [
      {
        question: "What is the capital of Italy?",
        correctAnswer: "Rome",
        background: gtd,
      },
      {
        question: "Who wrote 'The Great Gatsby'?",
        correctAnswer: "F. Scott Fitzgerald",
        background: rm,
      },
      {
        question: "What planet is known for its rings?",
        correctAnswer: "Saturn",
        background: mb4,
      },
      {
        question: "What is the chemical symbol for potassium?",
        correctAnswer: "K",
        background: pk4,
      },
    ],
  },
  {
    group: 5,
    questions: [
      {
        question: "What is the capital of Canada?",
        correctAnswer: "Ottawa",
        background: mb5,
      },
      {
        question: "Who wrote 'Moby-Dick'?",
        correctAnswer: "Herman Melville",
        background: gtd,
      },
      {
        question: "What planet is closest to the sun?",
        correctAnswer: "Mercury",
        background: pk5,
      },
      {
        question: "What is the chemical symbol for iron?",
        correctAnswer: "Fe",
        background: rm,
      },
    ],
  },
];

const mergeFetchedData = (
  data: DataType,
  predefined: QuestionGroup[]
): QuestionGroup[] => {
  return predefined.map((group, groupIndex) => {
    const updatedQuestions = group.questions.map((question, questionIndex) => ({
      ...question,
      question: data[groupIndex][questionIndex] || question.question,
    }));

    return {
      ...group,
      questions: updatedQuestions,
    };
  });
};

// Function to get question
const getQuestion = async (): Promise<DataType> => {
  const response = await fetch("http://localhost:12345/question");

  if (!response.ok) {
    throw new Error("HTTP error! status: ${response.status}");
  }

  const result: APIQuestionResponse = await response.json();
  const parsedData: DataType = result.questions;
  return parsedData;
};

const App: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [questionGroups, setQuestionGroups] = useState<QuestionGroup[]>(
    predefinedQuestionGroups
  );

  useEffect(() => {
    const fetchQuestion = async () => {
      // console.log('Fetching data...');
      try {
        const fetchedQuestion = await getQuestion();
        // console.log('Fetched Question: ', fetchedQuestion);
        const mergedData = mergeFetchedData(
          fetchedQuestion,
          predefinedQuestionGroups
        );
        setQuestionGroups(mergedData);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // console.error('Fetch Error: ', error);
      }
    };

    fetchQuestion();
  }, []);

  const handleGroupSelect = (group: number) => {
    setSelectedGroup(group);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    if (selectedGroup !== null) {
      window.location.href = `/quiz/${selectedGroup}`;
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedGroup(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home onGroupSelect={handleGroupSelect} />
                {selectedGroup !== null && (
                  <GroupConfirmModal
                    isOpen={modalVisible}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    selectedGroup={groupName[selectedGroup - 1]}
                  />
                )}
              </>
            }
          />
          <Route
            path="/quiz/:group"
            element={<QuizPage questionGroups={questionGroups} />}
          />
          <Route path="/secret-code" element={<SecretCode />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
