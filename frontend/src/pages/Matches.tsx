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
import "./Matches.css"

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
    <div style={{ padding: "2rem" }}>
      <h1>It's a Match! 🎉</h1>
      <p><strong>Name:</strong> {matchedUser.name}</p>
      <p><strong>Bio:</strong> {matchedUser.bio}</p>
      <p><strong>Role:</strong> {matchedUser.role}</p>
      <p><strong>Skillset:</strong> {matchedUser.skills}</p>
      <p><strong>Project Idea:</strong> {matchedUser.projectIdea}</p>
      <p><strong>Links:</strong> {matchedUser.links.join(", ")}</p>
      <p><strong>Contact Info:</strong> {matchedUser.contact}</p>

      <button onClick={() => navigate("/swipe")} style={{ marginTop: "1rem" }}>
        Back to Swiping
      </button>
    </div>
  );
};

export default Matches;
