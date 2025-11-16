// import React from "react";

// const CreateProfile: React.FC = () => {
//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>Create Profile Page</h1>
//       <p>This is a placeholder. Build your form here later.</p>
//     </div>
//   );
// };

// export default CreateProfile;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleCreateProfile} from "../handlers/createProfileHandlers";
import type { ProfileInput } from "../handlers/createProfileHandlers";

const CreateProfile: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProfileInput>({
    name: "",
    bio: "",
    role: "",
    skills: "",
    goal: "",
    projectIdea: "",
    links: [""],
    contact: "",
    imageUrl: "",
  });


  const handleChange = (field: keyof ProfileInput, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userId = await handleCreateProfile(formData);
      console.log("Profile created with ID:", userId);

      // Save user ID 
      localStorage.setItem("currentUserId", userId);

      // Go to swipe page
      navigate("/swipe");
    } catch (err) {
      console.error("Error creating profile:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Create Profile</h1>
      <p>This is a placeholder form UI — replace inputs later.</p>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={formData.name}
          onChange={e => handleChange("name", e.target.value)}
        />
        <input
          placeholder="Bio"
          value={formData.bio}
          onChange={e => handleChange("bio", e.target.value)}
        />
        <input
          placeholder="Role"
          value={formData.role}
          onChange={e => handleChange("role", e.target.value)}
        />
        <input
          placeholder="Skills"
          value={formData.skills}
          onChange={e => handleChange("skills", e.target.value)}
        />
        <input
          placeholder="Hackathon Goal"
          value={formData.goal}
          onChange={e => handleChange("goal", e.target.value)}
        />
        <input
          placeholder="Project Idea"
          value={formData.projectIdea}
          onChange={e => handleChange("projectIdea", e.target.value)}
        />
        <input
          placeholder="LinkedIn / Other Links"
          value={formData.links[0]}
          onChange={e => setFormData(prev => ({ ...prev, links: [e.target.value] }))}
        />
        <input
          placeholder="Preferred Contact Info"
          value={formData.contact}
          onChange={e => handleChange("contact", e.target.value)}
        />
        <input 
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={e => handleChange("imageUrl", e.target.value)}
        />
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default CreateProfile;
