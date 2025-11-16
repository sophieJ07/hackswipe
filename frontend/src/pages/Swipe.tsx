// import React from "react";

// const Swipe: React.FC = () => {
//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>Swipe Page</h1>
//       <p>This is a placeholder. Build your swipe cards here later.</p>
//     </div>
//   );
// };

// export default Swipe;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetProfileDeck, getNextProfile } from "../handlers/browseHandlers";
import { handleRightSwipe } from "../handlers/RightSwipeHandler";
import type { User } from "../types/User";
import nugget from "../assets/nugget.png";
import "./Swipe.css";

const Swipe: React.FC = () => {
  const navigate = useNavigate();
  const [currentProfile, setCurrentProfile] = useState<User | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // initialize profile deck on page load
  useEffect(() => {
    const init = async () => {
      const userId = localStorage.getItem("currentUserId");
      if (!userId) {
        alert("No current user found. Please create profile first.");
        navigate("/");
        return;
      }

      setCurrentUserId(userId);
      await resetProfileDeck(userId);
      const firstProfile = getNextProfile();
      setCurrentProfile(firstProfile);
    };

    init();
  }, [navigate]);

  // Left swipe (reject) handler
  const handleLeftSwipe = () => {
    const nextProfile = getNextProfile();
    setCurrentProfile(nextProfile);
  };

  // Right swipe (like) handler
  const handleRightSwipeClick = async () => {
    if (!currentUserId || !currentProfile) return;

    const matchedProfile = await handleRightSwipe(currentUserId, currentProfile.id!);
    if (matchedProfile) {
      // Save matched profile info to localStorage for Match page
      localStorage.setItem("currentMatch", JSON.stringify(matchedProfile));
      navigate("/matches");
    } else {
      const nextProfile = getNextProfile();
      setCurrentProfile(nextProfile);
    }
  };

  if (!currentProfile) {
    return <p>No more profiles to swipe.</p>;
  }

  return (
    <div className="swipe-page">
      <h1 className="swipe-page-title">Swipe Page</h1>

      <div className="swipe-card">
        <img
          className="swipe-card-image"
          src={currentProfile.imageUrl || nugget}
          alt={currentProfile.name}
        />

        <div className="swipe-card-content">
          <h2 className="swipe-card-name">{currentProfile.name}</h2>
          <p className="swipe-card-bio">Bio: {currentProfile.bio}</p>
          <p className="swipe-card-role">Role: {currentProfile.role}</p>
          <p className="swipe-card-skills">Skills: {currentProfile.skills}</p>
          <p className="swipe-card-goal">Hackathon Goal: {currentProfile.goal}</p>
          <p className="swipe-card-project">Project Idea: {currentProfile.projectIdea}</p>
          <p className="swipe-card-links">
            Links: {currentProfile.links?.join(", ")}
          </p>
          <p className="swipe-card-contact">Contact: {currentProfile.contact}</p>
        </div>

        <div className="swipe-card-buttons">
          <button className="swipe-btn left-btn" onClick={handleLeftSwipe}>
            Pass ❌
          </button>
          <button className="swipe-btn right-btn" onClick={handleRightSwipeClick}>
            Let's Team Up! ✅
          </button>
        </div>
      </div>
    </div>
  );
};

export default Swipe;
