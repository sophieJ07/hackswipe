import { addUser } from "../utils/firestore.ts";
import type { User } from "../types/User";

export type ProfileInput = {
  name: string;
  bio: string;
  role: string;
  skills: string;
  goal: string;
  projectIdea: string;
  links: string[];
  contact: string;
  imageUrl?: string;
};

export const handleCreateProfile = async (formData: ProfileInput): Promise<string> => {
  const userId = await addUser(formData as User);
  return userId; 
};

// For testing without database:
export async function mockCreateProfile() {
  return handleCreateProfile({
    name: "Test User",
    bio: "I like hackathons",
    role: "Developer",
    skills: "Frontend Dev, UI/UX",
    goal: "Meet collaborators",
    projectIdea: "AI Team Builder",
    links: ["https://linkedin.com/test"],
    contact: "test@email.com",
    imageUrl: "/default-photo.png",
  });
}
