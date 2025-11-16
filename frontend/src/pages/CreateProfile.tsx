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
import { handleCreateProfile } from "../handlers/createProfileHandlers";
import type { ProfileInput } from "../handlers/createProfileHandlers";
import nugget from "../assets/nugget.png";

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
    <div className="profile-page">
      <h1 style={{ marginBottom: "1rem" }}>Create your Hackathon Profile!</h1>

      <div className="profile-container">

        <div className="left-column">
          <img
            className="profile-pic"
            src={formData.imageUrl || nugget}
            alt="profile"
          />
          <input
            className="input"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={e => handleChange("name", e.target.value)}
          />
          <input
            className="input"
            name="contact"
            placeholder="Contact (Discord/Email)"
            value={formData.contact}
            onChange={e => handleChange("contact", e.target.value)}
          />
        </div>

        <div className="right-column">
          {/* Section 1: Roles & Skills */}
          <div className="section roles-skills">
            <input
              className="input"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={e => handleChange("role", e.target.value)}
            />
            <div className="input-group">
              <div className="row">
                <input
                  className="input flex"
                  name="skills"
                  placeholder="Skills"
                  value={formData.skills}
                  onChange={e => handleChange("skills", e.target.value)}
                />
                <button className="plus-btn">+</button>
              </div>
            </div>
          </div>

          {/* Section 2: Bio & Goals */}
          <div className="section bio-goals">
            <textarea
              className="textarea full-width"
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={e => handleChange("bio", e.target.value)}
            />
            <textarea
              className="textarea full-width"
              name="goal"
              placeholder="Hackathon Goal"
              value={formData.goal}
              onChange={e => handleChange("goal", e.target.value)}
            />
          </div>

          {/* Section 3: Image & Save */}
          <div className="section image-save">
            <input
              className="input full-width"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={e => handleChange("imageUrl", e.target.value)}
            />
            <button className="save-btn">Save Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
