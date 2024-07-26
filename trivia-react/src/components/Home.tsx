import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Home.css"; // Import the CSS file for custom styling

type HomeProps = {
  onGroupSelect: (group: number) => void;
};

const Home: React.FC<HomeProps> = ({ onGroupSelect }) => {
  const groups = ["Uno", "Dos", "Tres", "Cuatro", "Cinco"];
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  return (
    <div className="home-container">
      <h1 className="main-title text-center">Welcome to Digital Pandemic</h1>{" "}
      {/* Main title */}
      <h2 className="subtitle text-center">Select Question Group</h2>{" "}
      {/* Subtitle */}
      <div className="row mb-3 justify-content-center">
        {groups.map((group, index) => (
          <div
            className={`col-md-4 mb-3 ${
              index === 3 || index === 4 ? "col-md-3" : "col-md-4"
            }`}
            key={group}
          >
            <div
              className="group-card text-center p-4 border rounded"
              onClick={() => onGroupSelect(index + 1)}
            >
              <h4>{group}</h4>
            </div>
          </div>
        ))}
      </div>
      <button
        className="btn-nav btn-primary mt-4"
        onClick={() => navigate("/secret-code")}
      >
        Enter Secret Code
      </button>
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

export default Home;
