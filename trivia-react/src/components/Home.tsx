import React from "react";
import "./Home.css"; // Import the CSS file for custom styling

type HomeProps = {
  onGroupSelect: (group: number) => void;
};

const Home: React.FC<HomeProps> = ({ onGroupSelect }) => {
  const groups = [1, 2, 3, 4, 5];

  return (
    <div className="home-container">
      <h1 className="mb-4 text-center">Select Question Group</h1>
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
              onClick={() => onGroupSelect(group)}
            >
              <h4>Group {group}</h4>
            </div>
          </div>
        ))}
      </div>
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
