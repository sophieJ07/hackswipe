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
    <div style={{ padding: "2rem" }}>
      <h1>Swipe Page</h1>
      <img src={currentProfile.imageUrl || "/assets/nugget.png"}
        alt="Profile"
        style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "10px" }} />
      <h4>{currentProfile.name}</h4>
      <p>Bio: {currentProfile.bio}</p>
      <p>Role: {currentProfile.role}</p>
      <p>Skills: {currentProfile.skills}</p>
      <p>Hackathon Goal: {currentProfile.goal}</p>
      <p>Project Idea: {currentProfile.projectIdea}</p>
      <p>Links: {currentProfile.links?.join(", ")}</p>
      <p>Contact: {currentProfile.contact}</p>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleLeftSwipe} style={{ marginRight: "1rem" }}>
          Pass ❌
        </button>
        <button onClick={handleRightSwipeClick}>
          Let's Team Up! ✅
        </button>
      </div>
    </div>
  );
};

export default Swipe;
