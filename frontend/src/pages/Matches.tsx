// import React from "react";

// const Matches: React.FC = () => {
//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>Matches Page</h1>
//       <p>This is a placeholder. Display matches here later.</p>
//     </div>
//   );
// };

// export default Matches;


// src/pages/Matches.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";
import "./Swipe.css";
import nugget from "../assets/nugget.png";

const Matches: React.FC = () => {
  const navigate = useNavigate();
  const [matchedUser, setMatchedUser] = useState<User | null>(null);

  useEffect(() => {
    const storedMatch = localStorage.getItem("currentMatch");
    if (storedMatch) {
      setMatchedUser(JSON.parse(storedMatch));
    }
  }, []);

  if (!matchedUser) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>No match to display</h1>
        <button onClick={() => navigate("/swipe")}>Back to Swiping</button>
      </div>
    );
  }

  return (
    <div className="swipe-page">
      <h1 className="swipe-page-title">It's a match!</h1>

      <div className="swipe-card">
        <img
          className="swipe-card-image"
          src={matchedUser.imageUrl || nugget}
          alt={matchedUser.name}
        />

        <div className="swipe-card-content">
          <h2 className="swipe-card-name">{matchedUser.name}</h2>
          <p className="swipe-card-bio">Bio: {matchedUser.bio}</p>
          <p className="swipe-card-role">Role: {matchedUser.role}</p>
          <p className="swipe-card-skills">Skills: {matchedUser.skills}</p>
          <p className="swipe-card-goal">Hackathon Goal: {matchedUser.goal}</p>
          <p className="swipe-card-project">Project Idea: {matchedUser.projectIdea}</p>
          <p className="swipe-card-links">
            Links: {matchedUser.links?.join(", ")}
          </p>
          <p className="swipe-card-contact">Contact: {matchedUser.contact}</p>
        </div>
        </div>
    </div>
  );
};

export default Matches;
